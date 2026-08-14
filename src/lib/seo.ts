export interface SeoData {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  indexPage: boolean;
}

export interface HistoryLog {
  id: string;
  timestamp: string;
  routeId: string;
  action: string;
}

export function getSeoMeta(routeId: string, defaultMeta: any[], pathname = "/") {
  const cleanPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  const canonicalUrl = `https://adscpy.atmiyadevelopers.org${cleanPath}`;

  // Default SEO values
  let title = "ADSC.Py — Atmiya Developer Students Club";
  let description = "The student-led Python developer community at Atmiya University, Rajkot. Explore roadmaps, build real projects, and escape tutorial hell.";
  let ogTitle = "";
  let ogDescription = "";
  let indexPage = true;

  const noIndexRoutes = ['seo-dashboard', 'privacy', 'terms'];
  if (noIndexRoutes.includes(routeId)) {
    indexPage = false;
  }

  // Client-side override checks
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(`seo_override_${routeId}`);
      if (saved) {
        const parsed: SeoData = JSON.parse(saved);
        title = parsed.title;
        description = parsed.description;
        ogTitle = parsed.ogTitle || parsed.title;
        ogDescription = parsed.ogDescription || parsed.description;
        if (parsed.indexPage === false) indexPage = false;
      }
    } catch (e) {
      console.error("Failed to read SEO from localStorage", e);
    }
  }

  // Fallback to defaults
  if (defaultMeta && defaultMeta.length > 0) {
    const tObj = defaultMeta.find(m => m.title);
    const dObj = defaultMeta.find(m => m.name === "description");
    const ogTObj = defaultMeta.find(m => m.property === "og:title");
    const ogDObj = defaultMeta.find(m => m.property === "og:description");

    if (tObj && (!title || typeof window === 'undefined')) title = tObj.title;
    if (dObj && (!description || typeof window === 'undefined')) description = dObj.content;
    if (ogTObj) ogTitle = ogTObj.content;
    if (ogDObj) ogDescription = ogDObj.content;
  }

  const metaArray: any[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    { property: "og:title", content: ogTitle || title },
    { property: "og:description", content: ogDescription || description },
    { property: "og:image", content: "https://adscpy.atmiyadevelopers.org/python_logo.png" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: ogTitle || title },
    { name: "twitter:description", content: ogDescription || description },
    { name: "twitter:image", content: "https://adscpy.atmiyadevelopers.org/python_logo.png" },
  ];

  if (!indexPage) {
    metaArray.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    metaArray.push({ name: "robots", content: "index, follow" });
  }

  return metaArray;
}

export function saveSeoMeta(routeId: string, data: SeoData) {
  if (typeof window === 'undefined') return;
  const key = `seo_override_${routeId}`;
  localStorage.setItem(key, JSON.stringify(data));
  addHistoryLog(routeId, `Updated SEO configurations (Title: "${data.title.substring(0, 30)}...")`);
}

export function clearSeoMeta(routeId: string) {
  if (typeof window === 'undefined') return;
  const key = `seo_override_${routeId}`;
  localStorage.removeItem(key);
  addHistoryLog(routeId, "Reverted to code default SEO configurations");
}

export function getSeoHistory(): HistoryLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem("seo_history_logs");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function clearSeoHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("seo_history_logs");
}

function addHistoryLog(routeId: string, action: string) {
  if (typeof window === 'undefined') return;
  try {
    const history = getSeoHistory();
    const newLog: HistoryLog = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toLocaleString(),
      routeId,
      action
    };
    localStorage.setItem("seo_history_logs", JSON.stringify([newLog, ...history].slice(0, 100)));
  } catch (e) {
    console.error("Failed to add history log", e);
  }
}
