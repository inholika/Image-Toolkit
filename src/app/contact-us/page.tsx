
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon, Mail } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Image Toolkit',
  description: 'Get in touch with the team behind Image Toolkit.',
};

export default function ContactUsPage() {
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For any inquiries, questions, or feedback regarding the Image Toolkit, the best way to reach us is by visiting our "About Us" page.
              </p>
              <div className="flex items-center gap-4">
                 <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <p className="text-muted-foreground">Please find our contact details on the <Link href="/about" className="text-primary underline">About Us</Link> page.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
