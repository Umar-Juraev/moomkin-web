"use client"
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const hideHeaderFooter = pathname.endsWith('/search')
  
  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}