import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Book a discovery call. No bots, no salespeople — we answer within a business day.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactForm />;
}