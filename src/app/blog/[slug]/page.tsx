
import { dummyPosts, type Post } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon, Rss, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  params: { slug: string };
};

const founder = {
    name: 'Mukesh Kumar Yogi',
    role: 'Founder & Lead Developer',
    avatar: 'https://picsum.photos/seed/mukesh/100/100',
    bio: 'Mukesh is the creator of Image Toolkit, driven by a passion for building powerful and easy-to-use tools that are accessible to everyone on the web.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = dummyPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Image Toolkit Blog`,
    description: post.description,
    openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        images: [
            {
                url: post.imageUrl,
                width: 1200,
                height: 630,
                alt: post.title,
            }
        ]
    }
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = dummyPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

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
        <article className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{post.title}</h1>
            <p className="text-muted-foreground mb-4">
              Posted by {post.author} on {post.date}
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.imageHint}
                    priority
                />
            </div>
          <div
            className="prose prose-lg dark:prose-invert max-w-full text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-4">About the Author</h2>
              <Card className="bg-muted/50 border-none">
                <CardContent className="flex items-center gap-6 p-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={founder.avatar} alt={founder.name} />
                      <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{founder.name}</h3>
                        <p className="text-primary font-medium">{founder.role}</p>
                        <p className="text-sm text-muted-foreground">{founder.bio}</p>
                    </div>
                </CardContent>
              </Card>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
    return dummyPosts.map((post) => ({
      slug: post.slug,
    }));
}
