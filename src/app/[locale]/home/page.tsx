"use client";
import { Category, Stories, Products } from "@/section";

export default function HomePage() {
  return (
    <main>
      <Stories />
      <Category />
      <Products />
    </main>
  );
}
