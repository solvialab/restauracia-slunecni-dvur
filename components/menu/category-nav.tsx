"use client";
import { useEffect, useState } from "react";
export function CategoryNav({
  categories,
  label,
}: {
  categories: { id: string; name: string }[];
  label: string;
}) {
  const [active, setActive] = useState(categories[0]?.id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(entry.target.id.replace("menu-", ""));
      },
      { rootMargin: "-110px 0px -55% 0px", threshold: 0 },
    );
    for (const c of categories) {
      const el = document.getElementById(`menu-${c.id}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [categories]);
  return (
    <nav className="category-nav" aria-label={label}>
      {categories.map((c) => (
        <a
          key={c.id}
          href={`#menu-${c.id}`}
          className={active === c.id ? "active" : ""}
          aria-current={active === c.id ? "location" : undefined}
          onClick={() => setActive(c.id)}
        >
          {c.name}
          <span>↗</span>
        </a>
      ))}
    </nav>
  );
}
