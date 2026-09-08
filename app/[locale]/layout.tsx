import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { BrandLoader } from "@/components/loader/brand-loader";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale as Locale);
  const messages = await getMessages();
  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head />
      <body>
        <Script
          id="brand-intro"
          strategy="beforeInteractive"
        >{`try{if(!sessionStorage.getItem('slunecni-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.intro='true'}catch{}`}</Script>
        <NextIntlClientProvider messages={messages}>
          <BrandLoader />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
