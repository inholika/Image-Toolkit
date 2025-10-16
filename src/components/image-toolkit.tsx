
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Download, Image as ImageIcon, Loader2, Lock, Sparkles, Unlock, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { suggestImageFeatures } from '@/lib/actions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  width: z.number().positive().min(1),
  height: z.number().positive().min(1),
  keepAspectRatio: z.boolean().default(true),
  format: z.enum(['jpeg', 'jpg', 'png', 'webp', 'gif', 'bmp', 'tiff']).default('jpeg'),
  quality: z.number().min(0).max(100).default(90),
  targetSize: z.number().min(1).optional(),
  aiFeatures: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

const availableAiFeatures: { [key: string]: string } = {
  'Grayscale': 'Convert the image to black and white.',
  'Sepia': 'Apply a reddish-brown sepia tone.',
  'Invert': 'Invert the colors of the image.',
};

export default function ImageToolkit() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [processedImage, setProcessedImage] = useState<{ url: string; size: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [suggestedFeatures, setSuggestedFeatures] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const placeholderImage = PlaceHolderImages.find(p => p.id === 'image-toolkit-placeholder');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: 1920,
      height: 1080,
      keepAspectRatio: true,
      format: 'jpeg',
      quality: 90,
      aiFeatures: [],
    },
  });

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      toast({ variant: 'destructive', title: 'Invalid File', description: 'Please select a valid image file.' });
      return;
    }
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImagePreview(url);
    setProcessedImage(null);
    setSuggestedFeatures([]);

    const img = new window.Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      form.reset({
        ...form.getValues(),
        width: img.width,
        height: img.height,
      });
    };
    img.src = url;

    try {
      setIsLoadingAi(true);
      const dataUrl = await readFileAsDataUrl(selectedFile);
      const result = await suggestImageFeatures({ photoDataUri: dataUrl });
      if (result.success && result.data?.suggestedFeatures) {
        setSuggestedFeatures(result.data.suggestedFeatures);
      } else {
        toast({ variant: 'destructive', title: 'AI Error', description: result.error });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'AI Error', description: 'Could not get AI suggestions.' });
    } finally {
      setIsLoadingAi(false);
    }
  };
  
  const watchedValues = form.watch();

  const processImage = useCallback(async (values: FormValues) => {
    if (!file || !canvasRef.current) return;
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.src = imagePreview!;
    await new Promise(resolve => { img.onload = resolve; });

    canvas.width = values.width;
    canvas.height = values.height;

    ctx.drawImage(img, 0, 0, values.width, values.height);

    // Apply AI filters
    if (values.aiFeatures.length > 0) {
      const imageData = ctx.getImageData(0, 0, values.width, values.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (values.aiFeatures.includes('Grayscale')) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg; // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
        }
        if (values.aiFeatures.includes('Sepia')) {
          const r = data[i], g = data[i+1], b = data[i+2];
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        if (values.aiFeatures.includes('Invert')) {
          data[i] = 255 - data[i];
          data[i+1] = 255 - data[i+1];
          data[i+2] = 255 - data[i+2];
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }

    const format = values.format === 'jpg' ? 'jpeg' : values.format;
    const mimeType = `image/${format}`;
    const quality = format === 'png' ? undefined : values.quality / 100;
    
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedImage({ url, size: blob.size });
        }
        setIsProcessing(false);
      },
      mimeType,
      quality
    );
  }, [file, imagePreview]);

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (!originalDimensions) return;
      if (name === 'width' && values.width && values.keepAspectRatio) {
        form.setValue('height', Math.round((values.width / originalDimensions.width) * originalDimensions.height));
      }
      if (name === 'height' && values.height && values.keepAspectRatio) {
        form.setValue('width', Math.round((values.height / originalDimensions.height) * originalDimensions.width));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, originalDimensions]);


  const memoizedFormValues = useMemo(() => watchedValues, [
      watchedValues.width,
      watchedValues.height,
      watchedValues.keepAspectRatio,
      watchedValues.format,
      watchedValues.quality,
      JSON.stringify(watchedValues.aiFeatures)
  ]);

  useEffect(() => {
    if (!file) return;
    const debouncedProcessing = setTimeout(() => {
        processImage(memoizedFormValues);
    }, 500);
    return () => clearTimeout(debouncedProcessing);
  }, [memoizedFormValues, file, processImage]);

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage.url;
    link.download = `processed_${file?.name.split('.')[0]}.${form.getValues('format')}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const UploadPlaceholder = () => (
    <div
      className="flex flex-col items-center justify-center h-full w-full rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileChange(e.dataTransfer.files[0]);
        }
      }}
    >
      <UploadCloud className="w-16 h-16 text-muted-foreground/50 mb-4" />
      <h3 className="text-2xl font-semibold text-muted-foreground/80">Click to upload or drag & drop</h3>
      <p className="text-muted-foreground/60">PNG, JPG, WEBP, etc.</p>
    </div>
  );

  return (
    <div className="grid md:grid-cols-12 gap-6 p-4 sm:p-6 h-full">
      <canvas ref={canvasRef} className="hidden" />
      <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="hidden" accept="image/*" />
      
      <Card className="md:col-span-4 lg:col-span-3 h-full flex flex-col">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>Adjust your image settings</CardDescription>
        </CardHeader>
        <Separator />
        <ScrollArea className="flex-1">
          <CardContent className="p-4">
            <Form {...form}>
              <form className="space-y-6">
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Dimensions</h3>
                    <div className="grid grid-cols-2 gap-4 items-end">
                      <FormField control={form.control} name="width" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} disabled={!file} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="height" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} disabled={!file} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField control={form.control} name="keepAspectRatio" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={!file} />
                          </FormControl>
                          <div className="space-y-1 leading-none flex items-center gap-2">
                            {field.value ? <Lock className="w-4 h-4"/> : <Unlock className="w-4 h-4"/>}
                            <FormLabel>Keep aspect ratio</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                </div>
                
                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Format &amp; Quality</h3>
                    <FormField control={form.control} name="format" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Format</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!file}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a format" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="jpeg">JPEG</SelectItem>
                                    <SelectItem value="jpg">JPG</SelectItem>
                                    <SelectItem value="png">PNG</SelectItem>
                                    <SelectItem value="webp">WEBP</SelectItem>
                                    <SelectItem value="gif">GIF</SelectItem>
                                    <SelectItem value="bmp">BMP</SelectItem>
                                    <SelectItem value="tiff">TIFF</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )} />
                    {watchedValues.format !== 'png' && (
                        <FormField control={form.control} name="quality" render={({ field }) => (
                            <FormItem>
                                <div className="flex justify-between items-baseline">
                                    <FormLabel>Quality</FormLabel>
                                    <span className="text-sm font-mono text-muted-foreground">{field.value}%</span>
                                </div>
                                <FormControl>
                                    <Slider defaultValue={[field.value]} min={0} max={100} step={1} onValueChange={(vals) => field.onChange(vals[0])} disabled={!file} />
                                </FormControl>
                            </FormItem>
                        )} />
                    )}
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-lg font-medium flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent"/> AI Suggestions</h3>
                    <FormField
                      control={form.control}
                      name="aiFeatures"
                      render={() => (
                        <FormItem>
                          {isLoadingAi && Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="flex items-center space-x-3">
                                  <Skeleton className="h-4 w-4" />
                                  <Skeleton className="h-4 w-24" />
                              </div>
                          ))}
                          {!isLoadingAi && suggestedFeatures.length === 0 && file && <p className="text-sm text-muted-foreground">No specific features suggested.</p>}
                          {!file && <p className="text-sm text-muted-foreground">Upload an image to get AI suggestions.</p>}
                          {suggestedFeatures.map((feature) => {
                            const isAvailable = Object.keys(availableAiFeatures).includes(feature);
                            return (
                              <FormField
                                key={feature}
                                control={form.control}
                                name="aiFeatures"
                                render={({ field }) => (
                                  <FormItem key={feature} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, feature])
                                            : field.onChange(field.value?.filter((value) => value !== feature));
                                        }}
                                        disabled={!isAvailable}
                                      />
                                    </FormControl>
                                    <FormLabel className={cn("font-normal", !isAvailable && 'text-muted-foreground line-through')}>
                                      {feature}
                                      {!isAvailable && <span className="text-xs"> (Not available)</span>}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            );
                          })}
                        </FormItem>
                      )}
                    />
                </div>
              </form>
            </Form>
          </CardContent>
        </ScrollArea>
        <Separator/>
        <CardFooter className="p-4">
            <Button onClick={handleDownload} disabled={!processedImage || isProcessing} className="w-full">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                Download Image
            </Button>
        </CardFooter>
      </Card>
      
      <div className="md:col-span-8 lg:col-span-9 h-full">
        {!file && (
          <UploadPlaceholder/>
        )}
        {file && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col gap-2 h-full">
              <h3 className="font-bold text-lg text-center">Original</h3>
              {imagePreview && originalDimensions && <Image src={imagePreview} alt="Original preview" width={originalDimensions.width} height={originalDimensions.height} className="w-full h-auto object-contain max-h-[calc(100vh-18rem)] rounded-lg border bg-muted/20" />}
              <div className="text-sm text-muted-foreground text-center">
                {originalDimensions && file.size ? `${originalDimensions.width}x${originalDimensions.height} - ${formatBytes(file.size)}` : ''}
              </div>
            </div>
            <div className="flex flex-col gap-2 h-full">
              <h3 className="font-bold text-lg text-center">Processed</h3>
              <div className="w-full h-auto min-h-[200px] object-contain flex items-center justify-center max-h-[calc(100vh-18rem)] rounded-lg border bg-muted/20 relative">
                  {isProcessing && <Loader2 className="w-8 h-8 animate-spin text-primary" />}
                  {!isProcessing && processedImage && <Image src={processedImage.url} alt="Processed preview" width={watchedValues.width} height={watchedValues.height} className="w-full h-auto object-contain max-h-full" />}
                  {!isProcessing && !processedImage && <ImageIcon className="w-12 h-12 text-muted-foreground/30"/>}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {processedImage ? `${watchedValues.width}x${watchedValues.height} - ${formatBytes(processedImage.size)}` : `...`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
