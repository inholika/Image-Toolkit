import ImageToolkit from '@/components/image-toolkit';
import { Image as ImageIcon } from 'lucide-react';
import Footer from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';

const BASE_URL = 'https://imagetoolk.netlify.app';

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Image Toolkit",
  "operatingSystem": "WEB",
  "applicationCategory": "MultimediaApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "An all-in-one tool to convert, resize, crop, and apply AI-powered effects to your images for free.",
  "url": BASE_URL,
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="sticky top-0 z-30 flex-shrink-0 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <ImageIcon className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Image Toolkit
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <ImageToolkit />
      </main>
      <Footer />
    </div>
  );
}
