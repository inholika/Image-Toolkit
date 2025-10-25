
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon, UploadCloud, Edit3, Download, Rss } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Image Toolkit',
  description: 'Learn more about the mission and founder behind Image Toolkit.',
};

const founder = {
  name: 'Mukesh Kumar Yogi',
  role: 'Founder & Lead Developer',
  avatar: 'https://picsum.photos/seed/mukesh/100/100',
  bio: 'Mukesh is the creator of Image Toolkit, driven by a passion for building powerful and easy-to-use tools that are accessible to everyone on the web.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex-shrink-0 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <ImageIcon className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Image Toolkit
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Rss className="h-4 w-4" />
                <span>Blog</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">About Image Toolkit</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            An intuitive, all-in-one image editor that runs right in your browser. From resizing and cropping to AI-powered enhancements, we provide the tools you need for free.
          </p>
          
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>What is Image Toolkit?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Image Toolkit is a comprehensive, client-side image processing application. This means all your editing happens directly in your browser, ensuring your images remain private and secure. Our toolkit offers a wide range of features, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
                <li><b>Resizing:</b> Easily change image dimensions in pixels, inches, cm, or mm.</li>
                <li><b>Cropping:</b> Select and crop the perfect area of your image with a free-form selection tool.</li>
                <li><b>Format Conversion:</b> Convert images to and from popular formats like JPEG, PNG, WEBP, and more.</li>
                <li><b>AI-Powered Suggestions:</b> Get smart suggestions for filters and effects based on your image content.</li>
                <li><b>Quality Control:</b> Adjust the quality and compression level to optimize file size.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>How to Use It</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-lg">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">1. Upload Your Image</h3>
                  <p className="text-muted-foreground">Click the upload area or simply drag and drop an image file from your computer. Your image is loaded directly into your browser and never sent to a server.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-lg">
                  <Edit3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">2. Adjust the Settings</h3>
                  <p className="text-muted-foreground">Use the controls on the left panel to resize, crop, change the format, or apply AI-suggested filters. You'll see a live preview of your changes in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-lg">
                  <Download className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">3. Download Your Image</h3>
                  <p className="text-muted-foreground">Once you're happy with the result, click the "Download Image" button. Your processed image will be saved directly to your device.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center mb-8">Meet the Founder</h2>
          <div className="flex justify-center">
            <Card key={founder.name} className="text-center max-w-sm">
              <CardContent className="pt-6">
                <Avatar className="mx-auto h-24 w-24 mb-4">
                  <AvatarImage src={founder.avatar} alt={founder.name} />
                  <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{founder.name}</h3>
                <p className="text-primary font-medium mb-2">{founder.role}</p>
                <p className="text-sm text-muted-foreground">{founder.bio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
