"use client";
import { Category, Stories, Products } from "@/section";

export default function RootPage() {
  return (
    <main className="animate-fade-in">
      <Stories />
      <Category />
      <Products />
    </main>
  );
}
