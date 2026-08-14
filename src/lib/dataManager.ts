import { SESSIONS_DATA, type Session } from '../data/sessions';
import { OPPORTUNITIES_DATA, type Opportunity } from '../data/opportunities';
import { PROJECT_BLUEPRINTS, type ProjectBlueprint } from '../data/projects';
import { MAINTAINERS_DATA, type Maintainer } from '../data/maintainers';

function logCmsChange(routeId: string, action: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem("seo_history_logs");
    const history = saved ? JSON.parse(saved) : [];
    const newLog = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toLocaleString(),
      routeId,
      action
    };
    localStorage.setItem("seo_history_logs", JSON.stringify([newLog, ...history].slice(0, 100)));
  } catch (e) {
    console.error("Failed to add CMS change log", e);
  }
}

// Helper for dynamic logging inside edit functions
export function logCustomCmsChange(routeId: string, action: string) {
  logCmsChange(routeId, action);
}

// 1. Sessions Manager
export function getSessions(): Session[] {
  if (typeof window === 'undefined') return SESSIONS_DATA;
  try {
    const saved = localStorage.getItem("cms_sessions");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse sessions data from localStorage", e);
  }
  return SESSIONS_DATA;
}

export function saveSessions(sessions: Session[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_sessions", JSON.stringify(sessions));
}

export function resetSessions() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_sessions");
  logCmsChange("sessions", "Reset sessions data to default static values");
}

// 2. Opportunities Manager
export function getOpportunities(): Opportunity[] {
  if (typeof window === 'undefined') return OPPORTUNITIES_DATA;
  try {
    const saved = localStorage.getItem("cms_opportunities");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse opportunities data from localStorage", e);
  }
  return OPPORTUNITIES_DATA;
}

export function saveOpportunities(opportunities: Opportunity[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_opportunities", JSON.stringify(opportunities));
}

export function resetOpportunities() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_opportunities");
  logCmsChange("opportunities", "Reset opportunities data to default static values");
}

// 3. Projects Manager
export function getProjects(): ProjectBlueprint[] {
  if (typeof window === 'undefined') return PROJECT_BLUEPRINTS;
  try {
    const saved = localStorage.getItem("cms_projects");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse projects data from localStorage", e);
  }
  return PROJECT_BLUEPRINTS;
}

export function saveProjects(projects: ProjectBlueprint[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_projects", JSON.stringify(projects));
}

export function resetProjects() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_projects");
  logCmsChange("paths", "Reset project paths data to default static values");
}

// 4. Maintainers Manager
export function getMaintainers(): Maintainer[] {
  if (typeof window === 'undefined') return MAINTAINERS_DATA;
  try {
    const saved = localStorage.getItem("cms_maintainers");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse maintainers data from localStorage", e);
  }
  return MAINTAINERS_DATA;
}

export function saveMaintainers(maintainers: Maintainer[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_maintainers", JSON.stringify(maintainers));
}

export function resetMaintainers() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_maintainers");
  logCmsChange("community", "Reset maintainers data to default static values");
}

// 5. Domains / Journey Manager
import { PYTHON_DOMAINS, type PythonDomain } from '../data/domains';

export function getDomains(): PythonDomain[] {
  if (typeof window === 'undefined') return PYTHON_DOMAINS;
  try {
    const saved = localStorage.getItem("cms_domains");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse domains data from localStorage", e);
  }
  return PYTHON_DOMAINS;
}

export function saveDomains(domains: PythonDomain[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_domains", JSON.stringify(domains));
}

export function resetDomains() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_domains");
  logCmsChange("journey", "Reset Python journey domains to default values");
}

// 6. General settings
export interface GeneralSettings {
  clubName: string;
  clubSlogan: string;
  whatsappUrl: string;
  discordUrl: string;
  contactEmail: string;
  adminPassword?: string;
}

const DEFAULT_SETTINGS: GeneralSettings = {
  clubName: "ADSC.Py",
  clubSlogan: "Atmiya University's student-led Python developer community. Move from basic syntax to real-world code.",
  whatsappUrl: "https://chat.whatsapp.com/G5T6g7h8i9jK",
  discordUrl: "https://discord.gg/adscpy",
  contactEmail: "hello@adscpy.org",
  adminPassword: "adscpyadmin"
};

export function getGeneralSettings(): GeneralSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem("cms_general_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error("Failed to parse general settings from localStorage", e);
  }
  return DEFAULT_SETTINGS;
}

export function saveGeneralSettings(settings: GeneralSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem("cms_general_settings", JSON.stringify(settings));
}

export function resetGeneralSettings() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem("cms_general_settings");
  logCmsChange("settings", "Reset general settings back to default values");
}
