import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return null;
}

/** redirect to { serviceSlug } from dynamic segment — simple pass-through. */
export async function generateStaticParams() {
  return [];
}