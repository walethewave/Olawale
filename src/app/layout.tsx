import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';

import { metadata as meta } from '@/app/config';
import Loader from '@/app/loader';
import Providers from '@/app/providers';

import { createMetadata } from '@/lib/metadata';

const instrument_sans = Instrument_Sans({ subsets: ['latin'] });
const instrument_serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif'
});

export const metadata = createMetadata({
  title: {
    absolute: meta.site.title,
    template: `%s | ${meta.site.title}`
  },
  description: meta.site.description,
  twitter: {
    title: meta.site.title,
    description: meta.site.description
  }
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrument_sans.className} ${instrument_serif.variable} ${GeistMono.variable}`}>
        <Providers>
          <Loader />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
