import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex-shrink-0 border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-center">
          <p className="text-sm text-muted-foreground order-last sm:order-first">
            &copy; {new Date().getFullYear()} Image Toolkit. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/contact-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
