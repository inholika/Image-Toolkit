import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex-shrink-0 border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Image Toolkit. All rights reserved.
          </p>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
