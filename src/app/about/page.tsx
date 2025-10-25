
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Image Toolkit',
  description: 'Learn more about the team and mission behind Image Toolkit.',
};

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Lead Developer',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    bio: 'Alex is the mastermind behind the toolkit, with a passion for clean code and user-friendly design.',
  },
  {
    name: 'Maria Garcia',
    role: 'UI/UX Designer',
    avatar: 'https://picsum.photos/seed/maria/100/100',
    bio: 'Maria crafts the beautiful and intuitive interface that makes our toolkit a joy to use.',
  },
  {
    name: 'Sam Lee',
    role: 'AI Specialist',
    avatar: 'https://picsum.photos/seed/sam/100/100',
    bio: 'Sam develops the cutting-edge AI features that make your images stand out.',
  },
];

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
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">About Image Toolkit</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            We believe that powerful image editing should be accessible to everyone. Our mission is to provide a free, intuitive, and comprehensive tool for all your image processing needs.
          </p>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In a world where visual content is king, we noticed a gap. Professionals had powerful but expensive and complex software, while casual users were left with clunky, ad-riddled online tools. Image Toolkit was born from a desire to bridge that gap. We aim to provide a fast, free, and feature-rich image editor that runs right in your browser. From simple resizing and cropping to advanced AI-powered effects, we're committed to building the best tool for creators, marketers, students, and anyone who works with images.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="mx-auto h-24 w-24 mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
