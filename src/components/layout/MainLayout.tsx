"use client"
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    window.location.href = 'https://moomkin.taplink.ws' // ← your target URL
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> */}
    </div>
  );
} 
