
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Image Toolkit',
  description: 'Privacy Policy for the Image Toolkit application.',
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Your privacy is important to us. This policy explains what information we collect and how we use it.
          </p>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This Privacy Policy applies to the Image Toolkit web application (the "Service"). We are committed to protecting your privacy and handling your data in an open and transparent manner. The personal data that we collect and process may vary depending on your interaction with our Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Image Toolkit is designed to be a client-side application. This means that all image processing happens directly in your browser. We do not upload, store, or collect the images you work with. The images you select from your device are not transferred to our servers at any point.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Since we do not collect your images, we do not use them for any purpose. The application uses your images only for the duration of your session to provide the editing functionalities. Once you close the browser tab, the image data is gone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We are committed to ensuring that your information is secure. As all processing is done on your local machine, you have full control over your data. We do not have access to it, and therefore the risk of a data breach from our side concerning your images is eliminated.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI-powered features, such as "Suggest Features," send the image data to a third-party AI provider (e.g., Google's Gemini) for analysis. This data is used solely to provide the AI-driven suggestion and is subject to the privacy policy of the respective AI provider. We do not store the image or the AI response on our servers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, you can contact us by visiting the "About Us" page on our website.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
