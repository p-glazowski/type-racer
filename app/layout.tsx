import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const soraSans = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora', // Fixed: lowercase variable name
});

export const metadata: Metadata = {
  title: 'Word Racer',
  description: 'See how fast you can type!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraSans.className} font-sora antialiased bg-my-neutral-900 text-white flex flex-col justify-between`}
      >
        <Header />
        {children}
        <footer>lol</footer>
      </body>
    </html>
  );
}
