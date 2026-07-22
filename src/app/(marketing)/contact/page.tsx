import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call. No bots, no salespeople — we answer within a business day.",
  openGraph: { title: "Contact Lexpertz", description: "Book a discovery call." },
};

export default function ContactPage() {
  return <ContactForm />;
}