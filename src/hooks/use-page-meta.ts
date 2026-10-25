import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  robots?: string;
};

function setMeta(attr: "name" | "property", key: string, content: string | undefined) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === undefined) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Client-side replacement for TanStack's per-route `head()`.
export function usePageMeta({
  title,
  description,
  ogDescription = description,
  ogType = "website",
  twitterCard = "summary",
  robots,
}: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", ogDescription);
    setMeta("property", "og:type", ogType);
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "robots", robots);
  }, [title, description, ogDescription, ogType, twitterCard, robots]);
}
