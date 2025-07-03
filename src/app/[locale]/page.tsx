"use client";
import { Category, Stories, Products } from "@/section";

export default function RootPage() {
  return (
    <main className=" ">
      <Stories />
      <Category />
      <Products />
    </main>
  );
}
