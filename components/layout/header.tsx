"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useId } from "react";
import { Sun, Arrow, CloseIcon } from "@/components/ui/sun";
import {
  locales,
  localeLabels,
  localeNames,
  type Locale,
} from "@/i18n/routing";
import { restaurantConfig } from "@/config/restaurant";
import { trapDialogTab } from "@/components/ui/dialog-focus";

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const moveFocus = (step: number) => {
    const links = root.current?.querySelectorAll<HTMLAnchorElement>(
      '[role="menuitemradio"]',
    );
    if (!links?.length) return;
    const current = Array.from(links).indexOf(
      document.activeElement as HTMLAnchorElement,
    );
    links[(current + step + links.length) % links.length].focus();
  };
  return (
    <div
      className="language-select"
      ref={root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
        if (open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          e.preventDefault();
          moveFocus(e.key === "ArrowDown" ? 1 : -1);
        }
      }}
    >
      <button
        ref={trigger}
        className="language-trigger"
        aria-label={`${t("language")}: ${localeNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setHash(window.location.hash);
          setOpen(!open);
        }}
      >
        <span className="language-monogram">{localeLabels[locale]}</span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          aria-hidden="true"
        >
          <path d="m1 1 4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {open && (
        <div
          className="language-panel"
          id={id}
          role="menu"
          aria-label={t("language")}
        >
          <p className="language-panel-label" role="presentation">
            {t("chooseLanguage")}
            <Sun />
          </p>
          {locales.map((l) => (
            <Link
              href={
                pathname.replace(/^\/(cs|de|en|sk)(?=\/|$)/, `/${l}`) + hash
              }
              hrefLang={l}
              lang={l}
              role="menuitemradio"
              aria-checked={locale === l}
              className={`language-option ${locale === l ? "selected" : ""}`}
              key={l}
              onClick={() => setOpen(false)}
            >
              <span className="language-code">{localeLabels[l]}</span>
              <span>{localeNames[l]}</span>
              {locale === l ? (
                <span className="language-selected-dot" aria-hidden="true" />
              ) : (
                <Arrow direction="up-right" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const home = pathname === `/${locale}` || pathname === `/${locale}/`;
  const links = [
    { key: "home", href: `/${locale}/` },
    { key: "about", href: `/${locale}/#o-nas` },
    { key: "occasions", href: `/${locale}/#oslavy-a-pobyt` },
    { key: "menu", href: `/${locale}/jidelnilistek/` },
    { key: "gallery", href: `/${locale}/galerie/` },
    { key: "contact", href: `/${locale}/#kontakt` },
  ];
  useEffect(() => {
    const change = () => setScrolled(window.scrollY > 40);
    change();
    window.addEventListener("scroll", change, { passive: true });
    return () => window.removeEventListener("scroll", change);
  }, []);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current!;
    el.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = old;
      trigger.current?.focus();
    };
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <header className={`header ${scrolled || !home ? "header-solid" : ""}`}>
        <Link
          className="wordmark"
          href={`/${locale}/`}
          aria-label="Sluneční Dvůr"
        >
          <Sun />
          <span>
            <strong>SLUNEČNÍ DVŮR</strong>
            <small>RESTAURACE · MILČEVES</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t("open")}>
          {links.map((link) => (
            <Link
              key={link.key}
              className="nav-link"
              href={link.href}
              aria-current={
                pathname.replace(/\/$/, "") === link.href.replace(/\/$/, "")
                  ? "page"
                  : undefined
              }
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSelector />
          <a
            className="button header-reserve"
            href={restaurantConfig.phoneHref}
          >
            {t("reserve")}
            <Arrow direction="up-right" />
          </a>
          <button
            ref={trigger}
            className="menu-toggle"
            onClick={() => setOpen(true)}
            aria-label={t("open")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialog}
        className="mobile-menu"
        onKeyDown={trapDialogTab}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        aria-label={t("open")}
      >
        <div className="mobile-menu-top">
          <Sun />
          <button
            className="close-button"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
          >
            <CloseIcon />
          </button>
        </div>
        <nav>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              onClick={() => setOpen(false)}
            >
              <Sun className="mobile-nav-sun" />
              {t(link.key)}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <a href={restaurantConfig.phoneHref}>{restaurantConfig.phone}</a>
          <LanguageSelector />
          <p>Milčeves 55, Žatec</p>
        </div>
      </dialog>
    </>
  );
}
