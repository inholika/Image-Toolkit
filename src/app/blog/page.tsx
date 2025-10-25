
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon, Rss } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - Image Toolkit',
  description: 'Tips, tutorials, and updates from the Image Toolkit team.',
};

const dummyPosts = [
  {
    id: 4,
    title: 'Image Toolkit Kya Hai? (What is Image Toolkit?)',
    description: 'Image Toolkit ek powerful aur free online tool hai jo aapko aasani se images ko resize, crop, convert, aur enhance karne me madad karta hai. Jaaniye iske features ke baare mein.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 28, 2023',
    imageUrl: 'https://picsum.photos/seed/blog4/400/250',
    imageHint: 'image editing'
  },
  {
    id: 1,
    title: '5 Tips for Optimizing Images for the Web',
    description: 'Learn how to reduce image file sizes without sacrificing quality. Faster loading times are just a few clicks away!',
    author: 'Mukesh Kumar Yogi',
    date: 'October 26, 2023',
    imageUrl: 'https://picsum.photos/seed/blog1/400/250',
    imageHint: 'web performance'
  },
  {
    id: 2,
    title: 'Understanding Image Formats: JPG, PNG, WEBP, and More',
    description: 'Which image format should you use? This guide breaks down the pros and cons of the most popular formats.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 22, 2023',
    imageUrl: 'https://picsum.photos/seed/blog2/400/250',
    imageHint: 'file formats'
  },
  {
    id: 3,
    title: 'Introducing AI-Powered Feature Suggestions',
    description: 'Discover how our new AI feature can help you find the perfect edits for your photos automatically.',
    author: 'Mukesh Kumar Yogi',
    date: 'October 18, 2023',
    imageUrl: 'https://picsum.photos/seed/blog3/400/250',
    imageHint: 'artificial intelligence'
  },
];

export default function BlogPage() {
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
              <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground transition-colors">
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
          <div className="text-center mb-12">
            <Rss className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-4xl font-extrabold tracking-tight mt-4">Image Toolkit Blog</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Tips, tutorials, and updates from our team.
            </p>
          </div>

          <div className="grid gap-8">
            {dummyPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1">
                         <Image 
                            src={post.imageUrl}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="object-cover w-full h-full"
                            data-ai-hint={post.imageHint}
                         />
                    </div>
                    <div className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>{post.title}</CardTitle>
                           <CardDescription>
                            By {post.author} on {post.date}
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{post.description}</p>
                          <Link href="#" className="text-primary font-semibold mt-4 inline-block hover:underline">
                            Read More &rarr;
                          </Link>
                        </CardContent>
                    </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
