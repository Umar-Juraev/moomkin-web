import { Category, Stories, Products, Companies } from "@/section";

export default function RootPage() {
  return (
    <main>
      <Stories />
      <Category />
      <Companies/>
      <Products />
    </main>
  );
}
