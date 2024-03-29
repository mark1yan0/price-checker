import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Source_Code_Pro({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Price Checker',
  description: 'Small app to keep track of desired products prices',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='-bg--color-surface-300 sticky left-0 top-0 flex h-10 w-full items-center justify-between px-4'>
          <Link href='/'>PriceChecker</Link>
        </header>
        <main className='mx-auto mt-10 min-h-screen px-4 lg:max-w-[1024px] lg:px-0'>
          {children}
        </main>
      </body>
    </html>
  );
}
