
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon, Rss } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { dummyPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog - Image Toolkit',
  description: 'Tips, tutorials, and updates from the Image Toolkit team.',
};


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
              <Card key={post.id} className="overflow-hidden group">
                <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1 overflow-hidden">
                         <Image 
                            src={post.imageUrl}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={post.imageHint}
                         />
                    </div>
                    <div className="md:col-span-2">
                        <CardHeader>
                          <CardTitle className="group-hover:text-primary transition-colors"><Link href={`/blog/${post.slug}`}>{post.title}</Link></CardTitle>
                           <CardDescription>
                            By {post.author} on {post.date}
                           </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{post.description}</p>
                          <Link href={`/blog/${post.slug}`} className="text-primary font-semibold mt-4 inline-block hover:underline">
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
