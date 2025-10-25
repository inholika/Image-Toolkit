import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Image Toolkit - Free Online Image Editor',
  description: 'An all-in-one tool to convert, resize, crop, and apply AI-powered effects to your images for free. Supports JPEG, PNG, WEBP, and more.',
  keywords: ['image editor', 'image converter', 'resize image', 'crop image', 'AI image effects', 'free image tool'],
  openGraph: {
    title: 'Image Toolkit - Free Online Image Editor',
    description: 'An all-in-one tool to convert, resize, crop, and apply AI-powered effects to your images for free.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Image Toolkit Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Toolkit - Free Online Image Editor',
    description: 'An all-in-one tool to convert, resize, crop, and apply AI-powered effects to your images for free.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
