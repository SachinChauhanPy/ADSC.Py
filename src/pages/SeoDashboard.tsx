import React, { useState, useEffect } from 'react';
import { Link, type MetaFunction } from 'react-router';
import { Shell } from '../components/layout/Shell';
import { 
  getSeoMeta,
  saveSeoMeta, 
  clearSeoMeta, 
  getSeoHistory, 
  clearSeoHistory, 
  SeoData, 
  HistoryLog 
} from '../lib/seo';
import {
  getSessions,
  saveSessions,
  resetSessions,
  getOpportunities,
  saveOpportunities,
  resetOpportunities,
  getProjects,
  saveProjects,
  resetProjects,
  getMaintainers,
  saveMaintainers,
  resetMaintainers,
  getDomains,
  saveDomains,
  resetDomains,
  getGeneralSettings,
  saveGeneralSettings,
  resetGeneralSettings,
  GeneralSettings,
  logCustomCmsChange
} from '../lib/dataManager';
import { 
  Settings, 
  Eye, 
  Globe, 
  History, 
  Save, 
  RefreshCw, 
  AlertCircle, 
  Trash2, 
  Search, 
  Share2, 
  CheckCircle,
  Plus,
  Edit2,
  X,
  Users,
  Compass,
  Trophy,
  Calendar,
  Lock,
  Download,
  Info,
} from 'lucide-react';
import { type Session } from '../data/sessions';
import { type Opportunity } from '../data/opportunities';
import { type ProjectBlueprint } from '../data/projects';
import { type Maintainer } from '../data/maintainers';
import { type PythonDomain } from '../data/domains';

const ROUTE_DEFAULTS: Record<string, { name: string; path: string; title: string; description: string; ogTitle: string; ogDescription: string; indexPage: boolean }> = {
  home: {
    name: "Home",
    path: "/",
    title: "ADSC.Py — Atmiya Developer Students Club",
    description: "The student-led Python developer community at Atmiya University, Rajkot. Explore roadmaps, build real projects, and escape tutorial hell.",
    ogTitle: "ADSC.Py — Atmiya Developer Students Club",
    ogDescription: "The student-led Python developer community at Atmiya University, Rajkot.",
    indexPage: true
  },
  journey: {
    name: "Journey Map",
    path: "/journey",
    title: "Python Domain Journey Map | ADSC.Py",
    description: "Explore custom roadmaps for Python domains (Web, AI/ML, Data Science, Automation) at Atmiya University, Rajkot.",
    ogTitle: "Python Domain Journey Map | ADSC.Py",
    ogDescription: "Explore custom roadmaps for Python domains (Web, AI/ML, Data Science, Automation) at Atmiya University, Rajkot.",
    indexPage: true
  },
  paths: {
    name: "Learning Paths",
    path: "/paths",
    title: "Guided Python Project Blueprints | ADSC.Py",
    description: "Stop tutorial hell. Build real Python projects with structured feature checklists and starter templates.",
    ogTitle: "Guided Python Project Blueprints | ADSC.Py",
    ogDescription: "Stop tutorial hell. Build real Python projects with structured feature checklists and starter templates.",
    indexPage: true
  },
  sessions: {
    name: "Sessions & Workshops",
    path: "/sessions",
    title: "Practical Python Workshops & Sessions | ADSC.Py",
    description: "Hands-on workshops, code repositories, and knowledge library created by student mentors at Atmiya University.",
    ogTitle: "Practical Python Workshops & Sessions | ADSC.Py",
    ogDescription: "Hands-on workshops, code repositories, and knowledge library created by student mentors at Atmiya University.",
    indexPage: true
  },
  opportunities: {
    name: "Opportunities Matrix",
    path: "/opportunities",
    title: "Student Developer Opportunities Matrix | ADSC.Py",
    description: "Explore verified open-source mentorships, student developer fellowships, and global hackathons.",
    ogTitle: "Student Developer Opportunities Matrix | ADSC.Py",
    ogDescription: "Explore verified open-source mentorships, student developer fellowships, and global hackathons.",
    indexPage: true
  },
  community: {
    name: "Community & Team",
    path: "/community",
    title: "Meet the ADSC.Py Maintainers & Core Team | ADSC.Py",
    description: "Meet the student team leading the Python developer community at Atmiya University, Rajkot.",
    ogTitle: "Meet the ADSC.Py Maintainers & Core Team | ADSC.Py",
    ogDescription: "Meet the student team leading the Python developer community at Atmiya University, Rajkot.",
    indexPage: true
  },
  about: {
    name: "About Manifesto",
    path: "/about",
    title: "Origin Story & Community Manifesto | ADSC.Py",
    description: "Learn why ADSC.Py exists: bridging the gap between basic syntax and real-world software engineering at Atmiya University.",
    ogTitle: "Origin Story & Community Manifesto | ADSC.Py",
    ogDescription: "Learn why ADSC.Py exists: bridging the gap between basic syntax and real-world software engineering at Atmiya University.",
    indexPage: true
  },
  privacy: {
    name: "Privacy Policy",
    path: "/privacy",
    title: "Privacy Policy | ADSC.Py",
    description: "Privacy Policy for ADSC.Py - Atmiya Developer Students Club.",
    ogTitle: "Privacy Policy | ADSC.Py",
    ogDescription: "Privacy Policy for ADSC.Py - Atmiya Developer Students Club.",
    indexPage: false
  },
  terms: {
    name: "Terms of Service",
    path: "/terms",
    title: "Terms of Service | ADSC.Py",
    description: "Terms of Service for ADSC.Py - Atmiya Developer Students Club.",
    ogTitle: "Terms of Service | ADSC.Py",
    ogDescription: "Terms of Service for ADSC.Py - Atmiya Developer Students Club.",
    indexPage: false
  }
};

type ActiveCmsTab = 'seo' | 'sessions' | 'opportunities' | 'projects' | 'maintainers' | 'domains' | 'general';

export const meta: MetaFunction = ({ location }) => {
  return getSeoMeta('seo-dashboard', [{ title: "SEO Control Panel | ADSC.Py" }], location.pathname);
};

export default function SeoDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveCmsTab>('seo');
  
  // SEO Meta state
  const [selectedRoute, setSelectedRoute] = useState<string>('home');
  const [seoTitle, setSeoTitle] = useState<string>('');
  const [seoDescription, setSeoDescription] = useState<string>('');
  const [seoOgTitle, setSeoOgTitle] = useState<string>('');
  const [seoOgDescription, setSeoOgDescription] = useState<string>('');
  const [seoIndexPage, setSeoIndexPage] = useState<boolean>(true);

  // Content state arrays
  const [sessions, setSessionsState] = useState<Session[]>([]);
  const [opportunities, setOpportunitiesState] = useState<Opportunity[]>([]);
  const [projects, setProjectsState] = useState<ProjectBlueprint[]>([]);
  const [maintainers, setMaintainersState] = useState<Maintainer[]>([]);
  const [domains, setDomainsState] = useState<PythonDomain[]>([]);
  const [generalSettings, setGeneralSettingsState] = useState<GeneralSettings>({
    clubName: '',
    clubSlogan: '',
    whatsappUrl: '',
    discordUrl: '',
    contactEmail: '',
    adminPassword: ''
  });

  // Editing forms state
  const [editingSession, setEditingSession] = useState<Partial<Session> | null>(null);
  const [editingOpportunity, setEditingOpportunity] = useState<Partial<Opportunity> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<ProjectBlueprint> | null>(null);
  const [editingMaintainer, setEditingMaintainer] = useState<Partial<Maintainer> | null>(null);
  const [editingDomain, setEditingDomain] = useState<Partial<PythonDomain> | null>(null);

  const [history, setHistory] = useState<HistoryLog[]>([]);
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Check auth session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem("admin_authenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const settings = getGeneralSettings();
    const targetPassword = settings.adminPassword || 'adscpyadmin';
    if (usernameInput === 'admin' && passwordInput === targetPassword) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("admin_authenticated", "true");
      }
      setIsAuthenticated(true);
      setLoginError(null);
      showNotification("Authenticated successfully as administrator!", "success");
    } else {
      setLoginError("Invalid administrator credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem("admin_authenticated");
    }
    setIsAuthenticated(false);
    showNotification("Logged out successfully.", "info");
  };

  // Load configuration for the selected SEO route
  const loadSeoConfig = (routeId: string) => {
    const defaults = ROUTE_DEFAULTS[routeId];
    if (!defaults) return;

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`seo_override_${routeId}`);
      if (saved) {
        const parsed: SeoData = JSON.parse(saved);
        setSeoTitle(parsed.title);
        setSeoDescription(parsed.description);
        setSeoOgTitle(parsed.ogTitle || parsed.title);
        setSeoOgDescription(parsed.ogDescription || parsed.description);
        setSeoIndexPage(parsed.indexPage !== false);
      } else {
        setSeoTitle(defaults.title);
        setSeoDescription(defaults.description);
        setSeoOgTitle(defaults.ogTitle);
        setSeoOgDescription(defaults.ogDescription);
        setSeoIndexPage(defaults.indexPage);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadSeoConfig(selectedRoute);
    }
  }, [selectedRoute, isAuthenticated]);

  // Load all lists on load
  useEffect(() => {
    if (isAuthenticated) {
      setSessionsState(getSessions());
      setOpportunitiesState(getOpportunities());
      setProjectsState(getProjects());
      setMaintainersState(getMaintainers());
      setDomainsState(getDomains());
      setGeneralSettingsState(getGeneralSettings());
      setHistory(getSeoHistory());
    }
  }, [activeTab, isAuthenticated]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3500);
  };

  // SEO Actions
  const handleSeoSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data: SeoData = {
      title: seoTitle,
      description: seoDescription,
      ogTitle: seoOgTitle,
      ogDescription: seoOgDescription,
      indexPage: seoIndexPage
    };
    saveSeoMeta(selectedRoute, data);
    setHistory(getSeoHistory());
    showNotification(`SEO changes for ${ROUTE_DEFAULTS[selectedRoute].name} saved successfully!`);
  };

  const handleSeoRevert = () => {
    clearSeoMeta(selectedRoute);
    loadSeoConfig(selectedRoute);
    setHistory(getSeoHistory());
    showNotification(`Reverted ${ROUTE_DEFAULTS[selectedRoute].name} SEO to default configurations.`, 'info');
  };

  // Revision History
  const handleClearHistory = () => {
    clearSeoHistory();
    setHistory([]);
    showNotification('Revision history log cleared.', 'info');
  };

  // 1. Session content CRUD
  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;

    let updatedList: Session[];
    const isNew = !editingSession.id;
    const finalSession: Session = {
      id: editingSession.id || `session-${Date.now()}`,
      title: editingSession.title || 'Untitled Session',
      tagline: editingSession.tagline || '',
      speaker: {
        name: editingSession.speaker?.name || 'ADSC.Py Mentors',
        role: editingSession.speaker?.role || 'Core Maintainer'
      },
      date: editingSession.date || 'TBD',
      status: editingSession.status || 'Upcoming',
      domain: editingSession.domain || 'Python Development',
      level: editingSession.level || 'Beginner',
      description: editingSession.description || '',
      takeaways: editingSession.takeaways || [],
      prerequisites: editingSession.prerequisites || [],
      resources: {
        githubRepo: editingSession.resources?.githubRepo || '',
        slidesUrl: editingSession.resources?.slidesUrl || '',
        recordingUrl: editingSession.resources?.recordingUrl || ''
      },
      hidden: editingSession.hidden || false
    };

    if (isNew) {
      updatedList = [finalSession, ...sessions];
      logCustomCmsChange("sessions", `Created new workshop: "${finalSession.title}"`);
    } else {
      updatedList = sessions.map(s => s.id === finalSession.id ? finalSession : s);
      logCustomCmsChange("sessions", `Edited workshop: "${finalSession.title}"`);
    }

    saveSessions(updatedList);
    setSessionsState(updatedList);
    setEditingSession(null);
    showNotification(isNew ? "New workshop added!" : "Workshop changes saved!");
  };

  const handleDeleteSession = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the session: "${title}"?`)) {
      const updatedList = sessions.filter(s => s.id !== id);
      saveSessions(updatedList);
      setSessionsState(updatedList);
      logCustomCmsChange("sessions", `Deleted workshop: "${title}"`);
      showNotification("Workshop deleted.", "error");
    }
  };

  const handleToggleSessionVisibility = (id: string, title: string, currentHidden: boolean) => {
    const updatedList = sessions.map(s => s.id === id ? { ...s, hidden: !currentHidden } : s);
    saveSessions(updatedList);
    setSessionsState(updatedList);
    logCustomCmsChange("sessions", `${currentHidden ? "Showed" : "Hidden"} workshop on website: "${title}"`);
    showNotification(currentHidden ? "Workshop is now visible on site." : "Workshop has been hidden.");
  };

  const handleResetSessions = () => {
    if (window.confirm("Reset all workshop data back to original code defaults? Local edits will be lost.")) {
      resetSessions();
      setSessionsState(getSessions());
      showNotification("Workshop data reset to defaults.", "info");
    }
  };

  // 2. Opportunity content CRUD
  const handleSaveOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOpportunity) return;

    let updatedList: Opportunity[];
    const isNew = !editingOpportunity.id;
    const finalOpp: Opportunity = {
      id: editingOpportunity.id || `opp-${Date.now()}`,
      title: editingOpportunity.title || 'Untitled Opportunity',
      organization: editingOpportunity.organization || '',
      category: editingOpportunity.category || 'Open Source',
      description: editingOpportunity.description || '',
      eligibility: editingOpportunity.eligibility || 'All batches',
      deadline: editingOpportunity.deadline || 'TBD',
      relevantSkills: editingOpportunity.relevantSkills || [],
      officialUrl: editingOpportunity.officialUrl || '',
      isVerified: editingOpportunity.isVerified !== false,
      featuredBadge: editingOpportunity.featuredBadge || '',
      accentColor: editingOpportunity.accentColor || '#4285F4',
      hidden: editingOpportunity.hidden || false
    };

    if (isNew) {
      updatedList = [finalOpp, ...opportunities];
      logCustomCmsChange("opportunities", `Created new opportunity: "${finalOpp.title}"`);
    } else {
      updatedList = opportunities.map(o => o.id === finalOpp.id ? finalOpp : o);
      logCustomCmsChange("opportunities", `Edited opportunity: "${finalOpp.title}"`);
    }

    saveOpportunities(updatedList);
    setOpportunitiesState(updatedList);
    setEditingOpportunity(null);
    showNotification(isNew ? "New opportunity added!" : "Opportunity changes saved!");
  };

  const handleDeleteOpportunity = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete opportunity: "${title}"?`)) {
      const updatedList = opportunities.filter(o => o.id !== id);
      saveOpportunities(updatedList);
      setOpportunitiesState(updatedList);
      logCustomCmsChange("opportunities", `Deleted opportunity: "${title}"`);
      showNotification("Opportunity deleted.", "error");
    }
  };

  const handleToggleOpportunityVisibility = (id: string, title: string, currentHidden: boolean) => {
    const updatedList = opportunities.map(o => o.id === id ? { ...o, hidden: !currentHidden } : o);
    saveOpportunities(updatedList);
    setOpportunitiesState(updatedList);
    logCustomCmsChange("opportunities", `${currentHidden ? "Showed" : "Hidden"} opportunity: "${title}"`);
    showNotification(currentHidden ? "Opportunity is now visible on site." : "Opportunity has been hidden.");
  };

  const handleResetOpportunities = () => {
    if (window.confirm("Reset opportunities back to defaults? Local edits will be lost.")) {
      resetOpportunities();
      setOpportunitiesState(getOpportunities());
      showNotification("Opportunities reset to defaults.", "info");
    }
  };

  // 3. Project content CRUD
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: ProjectBlueprint[];
    const isNew = !editingProject.id;
    const finalProj: ProjectBlueprint = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title || 'Untitled Project',
      level: editingProject.level || 'Level 1: Fundamentals',
      levelNum: editingProject.levelNum || 1,
      domain: editingProject.domain || 'Python Development',
      problemSolved: editingProject.problemSolved || '',
      whatYouWillLearn: editingProject.whatYouWillLearn || [],
      techStack: editingProject.techStack || [],
      estimatedHours: editingProject.estimatedHours || '10 hours',
      difficulty: editingProject.difficulty || 'Beginner',
      githubStarterTemplateUrl: editingProject.githubStarterTemplateUrl || '',
      keyFeatures: editingProject.keyFeatures || [],
      hidden: editingProject.hidden || false
    };

    if (isNew) {
      updatedList = [finalProj, ...projects];
      logCustomCmsChange("paths", `Created new project blueprint: "${finalProj.title}"`);
    } else {
      updatedList = projects.map(p => p.id === finalProj.id ? finalProj : p);
      logCustomCmsChange("paths", `Edited project blueprint: "${finalProj.title}"`);
    }

    saveProjects(updatedList);
    setProjectsState(updatedList);
    setEditingProject(null);
    showNotification(isNew ? "New project added!" : "Project blueprint saved!");
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete project blueprint: "${title}"?`)) {
      const updatedList = projects.filter(p => p.id !== id);
      saveProjects(updatedList);
      setProjectsState(updatedList);
      logCustomCmsChange("paths", `Deleted project blueprint: "${title}"`);
      showNotification("Project blueprint deleted.", "error");
    }
  };

  const handleToggleProjectVisibility = (id: string, title: string, currentHidden: boolean) => {
    const updatedList = projects.map(p => p.id === id ? { ...p, hidden: !currentHidden } : p);
    saveProjects(updatedList);
    setProjectsState(updatedList);
    logCustomCmsChange("paths", `${currentHidden ? "Showed" : "Hidden"} project blueprint: "${title}"`);
    showNotification(currentHidden ? "Project path is now visible." : "Project path has been hidden.");
  };

  const handleResetProjects = () => {
    if (window.confirm("Reset learning paths back to defaults? Local edits will be lost.")) {
      resetProjects();
      setProjectsState(getProjects());
      showNotification("Project paths reset to defaults.", "info");
    }
  };

  // 4. Maintainer content CRUD
  const handleSaveMaintainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaintainer) return;

    let updatedList: Maintainer[];
    const isNew = !editingMaintainer.id;
    const finalMaint: Maintainer = {
      id: editingMaintainer.id || `maint-${Date.now()}`,
      name: editingMaintainer.name || 'Anonymous Mentor',
      role: editingMaintainer.role || 'Contributor',
      category: editingMaintainer.category || 'Core Team',
      university: editingMaintainer.university || 'Atmiya University, Rajkot',
      bio: editingMaintainer.bio || '',
      avatarPixelBg: editingMaintainer.avatarPixelBg || 'bg-zinc-100 text-zinc-900 border-zinc-900',
      githubUrl: editingMaintainer.githubUrl || '',
      linkedinUrl: editingMaintainer.linkedinUrl || '',
      focusDomain: editingMaintainer.focusDomain || 'Python Programming',
      hidden: editingMaintainer.hidden || false
    };

    if (isNew) {
      updatedList = [finalMaint, ...maintainers];
      logCustomCmsChange("community", `Added new team maintainer: "${finalMaint.name}"`);
    } else {
      updatedList = maintainers.map(m => m.id === finalMaint.id ? finalMaint : m);
      logCustomCmsChange("community", `Edited team maintainer: "${finalMaint.name}"`);
    }

    saveMaintainers(updatedList);
    setMaintainersState(updatedList);
    setEditingMaintainer(null);
    showNotification(isNew ? "New team member added!" : "Team member card saved!");
  };

  const handleDeleteMaintainer = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete team member: "${name}"?`)) {
      const updatedList = maintainers.filter(m => m.id !== id);
      saveMaintainers(updatedList);
      setMaintainersState(updatedList);
      logCustomCmsChange("community", `Deleted team maintainer: "${name}"`);
      showNotification("Team member deleted.", "error");
    }
  };

  const handleToggleMaintainerVisibility = (id: string, name: string, currentHidden: boolean) => {
    const updatedList = maintainers.map(m => m.id === id ? { ...m, hidden: !currentHidden } : m);
    saveMaintainers(updatedList);
    setMaintainersState(updatedList);
    logCustomCmsChange("community", `${currentHidden ? "Showed" : "Hidden"} team maintainer: "${name}"`);
    showNotification(currentHidden ? "Team member is now visible." : "Team member has been hidden.");
  };

  const handleResetMaintainers = () => {
    if (window.confirm("Reset team maintainers back to defaults? Local edits will be lost.")) {
      resetMaintainers();
      setMaintainersState(getMaintainers());
      showNotification("Maintainers reset to defaults.", "info");
    }
  };

  // 5. Journey Domain content CRUD
  const handleSaveDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDomain) return;

    let updatedList: PythonDomain[];
    const isNew = !editingDomain.id;
    const finalDomain: PythonDomain = {
      id: editingDomain.id || `domain-${Date.now()}`,
      title: editingDomain.title || 'Untitled Track',
      shortDesc: editingDomain.shortDesc || '',
      tagline: editingDomain.tagline || '',
      iconName: editingDomain.iconName || 'PixelPython',
      color: editingDomain.color || '#4285F4',
      badgeBg: editingDomain.badgeBg || 'bg-blue-100',
      badgeText: editingDomain.badgeText || 'text-blue-900',
      whatItIs: editingDomain.whatItIs || '',
      whyPython: editingDomain.whyPython || '',
      realWorldUse: editingDomain.realWorldUse || [],
      coreLibraries: editingDomain.coreLibraries || [],
      beginnerProject: {
        title: editingDomain.beginnerProject?.title || 'Beginner Project Spec',
        description: editingDomain.beginnerProject?.description || 'Build code.',
        tech: editingDomain.beginnerProject?.tech || ['Python']
      },
      intermediateProject: {
        title: editingDomain.intermediateProject?.title || 'Intermediate Project Spec',
        description: editingDomain.intermediateProject?.description || 'Build app.',
        tech: editingDomain.intermediateProject?.tech || ['Python']
      },
      learningSteps: editingDomain.learningSteps || [],
      hidden: editingDomain.hidden || false
    };

    if (isNew) {
      updatedList = [finalDomain, ...domains];
      logCustomCmsChange("journey", `Created new journey domain: "${finalDomain.title}"`);
    } else {
      updatedList = domains.map(d => d.id === finalDomain.id ? finalDomain : d);
      logCustomCmsChange("journey", `Edited journey domain: "${finalDomain.title}"`);
    }

    saveDomains(updatedList);
    setDomainsState(updatedList);
    setEditingDomain(null);
    showNotification(isNew ? "New domain roadmap added!" : "Domain roadmap changes saved!");
  };

  const handleDeleteDomain = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete roadmap track: "${title}"?`)) {
      const updatedList = domains.filter(d => d.id !== id);
      saveDomains(updatedList);
      setDomainsState(updatedList);
      logCustomCmsChange("journey", `Deleted journey domain: "${title}"`);
      showNotification("Domain roadmap deleted.", "error");
    }
  };

  const handleToggleDomainVisibility = (id: string, title: string, currentHidden: boolean) => {
    const updatedList = domains.map(d => d.id === id ? { ...d, hidden: !currentHidden } : d);
    saveDomains(updatedList);
    setDomainsState(updatedList);
    logCustomCmsChange("journey", `${currentHidden ? "Showed" : "Hidden"} domain roadmap: "${title}"`);
    showNotification(currentHidden ? "Roadmap is now visible on site." : "Roadmap has been hidden.");
  };

  const handleResetDomains = () => {
    if (window.confirm("Reset Python Journey domains back to defaults? Local edits will be lost.")) {
      resetDomains();
      setDomainsState(getDomains());
      showNotification("Journey domains reset to defaults.", "info");
    }
  };

  // 6. General Branding & Security Settings CRUD
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveGeneralSettings(generalSettings);
    showNotification("Branding & security credentials saved successfully!");
  };

  const handleResetGeneralSettings = () => {
    if (window.confirm("Reset branding settings back to original defaults?")) {
      resetGeneralSettings();
      setGeneralSettingsState(getGeneralSettings());
      showNotification("General branding settings reset.", "info");
    }
  };

  // 7. Sitemap Compiler & Exporter
  const handleDownloadSitemap = () => {
    const base = "https://adscpy.atmiyadevelopers.org";
    const urls = [
      { loc: "", change: "daily", prio: "1.0" },
      { loc: "/journey", change: "weekly", prio: "0.8" },
      { loc: "/paths", change: "weekly", prio: "0.8" },
      { loc: "/sessions", change: "weekly", prio: "0.7" },
      { loc: "/opportunities", change: "weekly", prio: "0.7" },
      { loc: "/community", change: "monthly", prio: "0.6" },
      { loc: "/about", change: "monthly", prio: "0.6" },
    ];

    // Dynamic domains
    domains.filter(d => !d.hidden).forEach(d => {
      urls.push({ loc: `/journey/${d.id}`, change: "weekly", prio: "0.7" });
    });

    // Dynamic projects
    projects.filter(p => !p.hidden).forEach(p => {
      urls.push({ loc: `/paths/${p.id}`, change: "weekly", prio: "0.7" });
    });

    // Dynamic sessions
    sessions.filter(s => !s.hidden).forEach(s => {
      urls.push({ loc: `/sessions/${s.id}`, change: "weekly", prio: "0.6" });
    });

    // Dynamic opportunities
    opportunities.filter(o => !o.hidden).forEach(o => {
      urls.push({ loc: `/opportunities/${o.id}`, change: "weekly", prio: "0.6" });
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach(u => {
      xml += `  <url>\n    <loc>${base}${u.loc}</loc>\n    <changefreq>${u.change}</changefreq>\n    <priority>${u.prio}</priority>\n  </url>\n`;
    });
    xml += `</urlset>\n`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Downloaded dynamic sitemap.xml file!", "success");
  };

  // Render Login Card if not logged in
  if (!isAuthenticated) {
    return (
      <Shell>
        <div className="max-w-md mx-auto py-16 text-left">
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 shadow-[4px_4px_0px_#121212]">
            <div className="text-center space-y-2 border-b-2 border-dashed border-zinc-200 pb-4">
              <div className="inline-flex p-3 bg-red-100 text-red-900 border-2 border-red-900 rounded-full">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-zinc-900">SEO & Content Login</h2>
              <p className="text-xs text-zinc-500 font-mono">Authorization required to edit ADSC.Py databases.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700 font-mono">Administrator ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. admin"
                  value={usernameInput}
                  onChange={e => setUsernameInput(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-700 font-mono">Access Key Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50"
                />
              </div>

              {loginError && (
                <div className="bg-red-50 text-red-900 text-xs font-mono p-3 border border-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="pixel-btn-python w-full py-3 text-xs flex items-center justify-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
              >
                <Lock className="w-4 h-4" />
                <span>Verify Credentials</span>
              </button>
            </form>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="space-y-8 max-w-6xl mx-auto py-4">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-4 relative">
          <div className="pixel-badge bg-[#FFD43B] text-zinc-900 inline-block font-bold">
            ADSC.Py STANDALONE CMS
          </div>
          
          <button 
            onClick={handleLogout}
            className="absolute top-4 right-0 pixel-btn text-xs px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 font-mono font-bold text-zinc-800"
          >
            Logout admin
          </button>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
            SEO & Content Management Panel
          </h1>
          <p className="text-zinc-600 font-mono text-sm max-w-xl mx-auto">
            Dynamic content editing dashboard. Add, modify, delete, and control site parameters instantly in your browser.
          </p>
        </div>

        {/* Dynamic Notification Toast */}
        {notif && (
          <div className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-2 px-4 py-3 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] font-pixel text-xs ${
            notif.type === 'success' ? 'bg-emerald-100 text-emerald-900 border-emerald-900' :
            notif.type === 'info' ? 'bg-blue-100 text-blue-900 border-blue-900' : 'bg-red-100 text-red-900 border-red-900'
          }`}>
            {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            {notif.type === 'info' && <Globe className="w-4 h-4 text-blue-600" />}
            {notif.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{notif.message}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b-2 border-zinc-900 pb-3 font-pixel text-[10px] sm:text-xs">
          <button
            onClick={() => { setActiveTab('seo'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'seo' ? 'bg-[#FFD43B] text-zinc-900 translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO Meta</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('sessions'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'sessions' ? 'bg-[#4285F4] text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Workshops (Sessions)</span>
          </button>

          <button
            onClick={() => { setActiveTab('opportunities'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'opportunities' ? 'bg-[#34A853] text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Opportunities</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'projects' ? 'bg-[#EA4335] text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Project Paths</span>
          </button>

          <button
            onClick={() => { setActiveTab('domains'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'domains' ? 'bg-orange-600 text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Journey Tracks</span>
          </button>

          <button
            onClick={() => { setActiveTab('maintainers'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'maintainers' ? 'bg-zinc-900 text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Core Maintainers</span>
          </button>

          <button
            onClick={() => { setActiveTab('general'); }}
            className={`px-2.5 sm:px-4 py-2 border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] flex items-center gap-1.5 font-bold transition-all ${
              activeTab === 'general' ? 'bg-purple-600 text-white translate-y-[1px]' : 'bg-white text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Branding</span>
          </button>
        </div>

        {/* SEO TAB CONTENT */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* SEO Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="pixel-card-static p-4 bg-zinc-950 text-white space-y-3">
                <h3 className="font-pixel text-xs font-bold text-[#FFD43B] tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>PAGE ROUTES</span>
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                  Select a page route to manage metadata overrides.
                </p>
                <div className="space-y-1.5 pt-2">
                  {Object.entries(ROUTE_DEFAULTS).map(([key, route]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedRoute(key)}
                      className={`w-full text-left px-3 py-2 text-xs font-mono border-2 transition-all flex items-center justify-between ${
                        selectedRoute === key 
                          ? 'bg-[#FFD43B] text-zinc-900 border-[#FFD43B] font-bold shadow-[2px_2px_0px_#ffffff]' 
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      <span>{route.name}</span>
                      <span className={`text-[9px] px-1 py-0.5 rounded font-pixel ${
                        selectedRoute === key ? 'bg-zinc-900/10 text-zinc-900' : 'bg-zinc-950 text-zinc-500'
                      }`}>
                        {route.path}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Meta Editor Form */}
            <div className="lg:col-span-9 space-y-8">
              <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                  <div className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-zinc-900" />
                    <h2 className="text-xl font-extrabold text-zinc-900">
                      SEO Configuration — {ROUTE_DEFAULTS[selectedRoute].name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-[10px] font-pixel border-2 border-zinc-900 shadow-[2px_2px_0px_#121212] ${
                      seoIndexPage ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                    }`}>
                      {seoIndexPage ? 'INDEXABLE (ACTIVE)' : 'NOINDEX (HIDDEN)'}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSeoSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-pixel text-xs font-bold text-zinc-900 border-b-2 border-dashed border-zinc-200 pb-1.5 flex items-center gap-1.5">
                        <Search className="w-4 h-4 text-zinc-500" />
                        <span>SEARCH ENGINES</span>
                      </h3>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700 font-mono">Page SEO Title *</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          required
                          className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50"
                          maxLength={70}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700 font-mono">Page Meta Description *</label>
                        <textarea
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          required
                          rows={3}
                          className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50 resize-none"
                          maxLength={160}
                        />
                      </div>

                      <div className="bg-zinc-50 p-4 border border-zinc-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-900 font-mono">Indexing Status</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={seoIndexPage} 
                              onChange={(e) => setSeoIndexPage(e.target.checked)} 
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                          If hidden (noindex), search crawlers will ignore this page on Google searches.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-pixel text-xs font-bold text-zinc-900 border-b-2 border-dashed border-zinc-200 pb-1.5 flex items-center gap-1.5">
                        <Share2 className="w-4 h-4 text-zinc-500" />
                        <span>SOCIAL CARD (OPEN GRAPH)</span>
                      </h3>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700 font-mono">Social Title</label>
                        <input
                          type="text"
                          value={seoOgTitle}
                          onChange={(e) => setSeoOgTitle(e.target.value)}
                          placeholder={seoTitle}
                          className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-zinc-700 font-mono">Social Description</label>
                        <textarea
                          value={seoOgDescription}
                          onChange={(e) => setSeoOgDescription(e.target.value)}
                          placeholder={seoDescription}
                          rows={3}
                          className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none focus:bg-amber-50 resize-none"
                        />
                      </div>

                      <div className="bg-zinc-50 p-3 border border-zinc-200 text-[10px] text-zinc-600 font-mono space-y-1">
                        <span className="font-bold block">Social Card Image:</span>
                        <span>Shared Preview defaults to: <code className="bg-zinc-200 px-1 py-0.5 rounded">/python_logo.png</code></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 flex flex-wrap gap-4 items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSeoRevert}
                      className="pixel-btn px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs flex items-center gap-1.5 font-bold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Revert to Code Defaults</span>
                    </button>
                    <button
                      type="submit"
                      className="pixel-btn-python px-6 py-2.5 text-xs flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save SEO Settings</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Mocks Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="pixel-card-static p-6 bg-white border-2 border-zinc-900 space-y-4">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900 flex items-center gap-1.5"><Eye className="w-4 h-4" /><span>GOOGLE PREVIEW</span></h3>
                  <div className="border border-zinc-200 rounded p-4 font-sans bg-white shadow-sm space-y-1 text-left">
                    <div className="flex items-center gap-1 text-[11px] text-[#202124]">
                      <span>https://adscpy.atmiyadevelopers.org</span>
                      <span className="text-[#5f6368] font-mono">{ROUTE_DEFAULTS[selectedRoute].path}</span>
                    </div>
                    <h4 className="text-[19px] text-[#1a0dab] hover:underline cursor-pointer leading-tight font-medium">{seoTitle || "No Title"}</h4>
                    <p className="text-[13px] text-[#4d5156] leading-relaxed font-sans">{seoDescription}</p>
                  </div>
                </div>

                <div className="pixel-card-static p-6 bg-white border-2 border-zinc-900 space-y-4">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900 flex items-center gap-1.5"><Share2 className="w-4 h-4" /><span>SOCIAL SHARE PREVIEW</span></h3>
                  <div className="border border-zinc-200 rounded overflow-hidden bg-[#f2f3f5] max-w-sm mx-auto text-left shadow-sm">
                    <div className="bg-zinc-200 h-28 flex items-center justify-center relative">
                      <img src="/python_logo.png" alt="preview" className="w-12 h-12 object-contain" />
                    </div>
                    <div className="p-3 bg-white border-t border-zinc-200 space-y-1">
                      <div className="text-[9px] text-zinc-500 uppercase font-mono">ADSCPY.ATMIYADEVELOPERS.ORG</div>
                      <h4 className="text-xs font-semibold text-zinc-900 leading-snug">{seoOgTitle || seoTitle}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">{seoOgDescription || seoDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* History list log */}
              <div className="pixel-card-static p-6 bg-zinc-950 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="font-pixel text-sm font-bold text-white flex items-center gap-1.5"><History className="w-4 h-4 text-[#FFD43B]" /><span>SEO Revisions History Log</span></h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-[10px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1"><Trash2 className="w-3 h-3" /><span>Clear History</span></button>
                  )}
                </div>
                {history.length === 0 ? (
                  <p className="py-6 text-center text-zinc-500 font-mono text-xs">No adjustments recorded yet.</p>
                ) : (
                  <div className="overflow-y-auto max-h-48 text-left">
                    <table className="w-full font-mono text-[11px]">
                      <thead>
                        <tr className="border-b border-zinc-800 text-[#FFD43B]">
                          <th className="py-2 pr-4 font-bold">Time</th>
                          <th className="py-2 pr-4 font-bold">Section</th>
                          <th className="py-2 font-bold">Log Record</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900 text-zinc-300">
                        {history.map((log) => (
                          <tr key={log.id}>
                            <td className="py-2 pr-4 text-zinc-500">{log.timestamp}</td>
                            <td className="py-2 pr-4 text-[#4285F4] font-bold uppercase">{log.routeId}</td>
                            <td className="py-2">{log.action}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT SESSIONS MANAGER TAB */}
        {activeTab === 'sessions' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-zinc-900" />
                <h2 className="text-xl font-extrabold text-zinc-900">Workshops & Sessions Manager</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetSessions} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
                <button
                  onClick={() => { setEditingSession({}); }}
                  className="pixel-btn-python text-xs px-4 py-1.5 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Workshop</span>
                </button>
              </div>
            </div>

            {/* Session Edit Drawer / Form Overlay */}
            {editingSession && (
              <div className="bg-zinc-50 p-6 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900">{editingSession.id ? 'EDIT WORKSHOP' : 'CREATE WORKSHOP'}</h3>
                  <button onClick={() => setEditingSession(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSaveSession} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Workshop Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingSession.title || ''} 
                        onChange={e => setEditingSession({...editingSession, title: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Tagline / Key Topic</label>
                      <input 
                        type="text" 
                        value={editingSession.tagline || ''} 
                        onChange={e => setEditingSession({...editingSession, tagline: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Speaker Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingSession.speaker?.name || ''} 
                        onChange={e => setEditingSession({
                          ...editingSession, 
                          speaker: { name: e.target.value, role: editingSession.speaker?.role || '' }
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Speaker Role</label>
                      <input 
                        type="text" 
                        value={editingSession.speaker?.role || ''} 
                        onChange={e => setEditingSession({
                          ...editingSession, 
                          speaker: { name: editingSession.speaker?.name || '', role: e.target.value }
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Date / Schedule Status *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingSession.date || ''} 
                        placeholder="e.g., Saturday, Sept 12 at 10 AM" 
                        onChange={e => setEditingSession({...editingSession, date: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Workshop Domain *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingSession.domain || ''} 
                        placeholder="e.g., Web Development" 
                        onChange={e => setEditingSession({...editingSession, domain: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Status *</label>
                      <select 
                        value={editingSession.status || 'Upcoming'} 
                        onChange={e => setEditingSession({...editingSession, status: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Past">Past</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Skill Level *</label>
                      <select 
                        value={editingSession.level || 'Beginner'} 
                        onChange={e => setEditingSession({...editingSession, level: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Workshop Summary Description *</label>
                    <textarea 
                      required 
                      value={editingSession.description || ''} 
                      rows={2} 
                      onChange={e => setEditingSession({...editingSession, description: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Code Repo URL (optional)</label>
                      <input 
                        type="url" 
                        value={editingSession.resources?.githubRepo || ''} 
                        onChange={e => setEditingSession({
                          ...editingSession, 
                          resources: { ...editingSession.resources, githubRepo: e.target.value }
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Slides URL (optional)</label>
                      <input 
                        type="url" 
                        value={editingSession.resources?.slidesUrl || ''} 
                        onChange={e => setEditingSession({
                          ...editingSession, 
                          resources: { ...editingSession.resources, slidesUrl: e.target.value }
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Video Link (optional)</label>
                      <input 
                        type="url" 
                        value={editingSession.resources?.recordingUrl || ''} 
                        onChange={e => setEditingSession({
                          ...editingSession, 
                          resources: { ...editingSession.resources, recordingUrl: e.target.value }
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                    <button type="button" onClick={() => setEditingSession(null)} className="pixel-btn text-xs px-4 py-2 bg-zinc-100 font-bold">Cancel</button>
                    <button type="submit" className="pixel-btn-python text-xs px-6 py-2 flex items-center gap-1 font-bold shadow-[2px_2px_0px_#121212]"><Save className="w-4 h-4" />Save Workshop</button>
                  </div>
                </form>
              </div>
            )}

            {/* List display */}
            <div className="border border-zinc-300 divide-y divide-zinc-200 font-mono text-xs">
              {sessions.map((sess) => (
                <div key={sess.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-900">{sess.title}</span>
                      <span className={`px-1.5 py-0.5 text-[9px] font-pixel ${sess.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-zinc-100 text-zinc-600'}`}>{sess.status}</span>
                      <span className="bg-zinc-100 text-zinc-600 px-1 py-0.5 text-[9px] rounded">{sess.level}</span>
                    </div>
                    <p className="text-zinc-500 text-[10px]">{sess.speaker.name} • {sess.speaker.role}</p>
                    <p className="text-zinc-600 text-[11px] font-sans">{sess.tagline || sess.description.substring(0, 80) + '...'}</p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] text-zinc-500">
                      <span>Live link:</span>
                      <Link to={`/sessions/${sess.id}`} className="text-[#4285F4] hover:underline">/sessions/{sess.id}</Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-500">Show on Site:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!sess.hidden} 
                          onChange={() => handleToggleSessionVisibility(sess.id, sess.title, sess.hidden || false)} 
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    <button onClick={() => setEditingSession(sess)} className="text-zinc-600 hover:text-zinc-900 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteSession(sess.id, sess.title)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT OPPORTUNITIES MANAGER TAB */}
        {activeTab === 'opportunities' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-zinc-900" />
                <h2 className="text-xl font-extrabold text-zinc-900">Opportunities Manager</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetOpportunities} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
                <button
                  onClick={() => { setEditingOpportunity({}); }}
                  className="pixel-btn-green text-xs px-4 py-1.5 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Opportunity</span>
                </button>
              </div>
            </div>

            {/* Opportunity form drawer */}
            {editingOpportunity && (
              <div className="bg-zinc-50 p-6 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900">{editingOpportunity.id ? 'EDIT OPPORTUNITY' : 'CREATE OPPORTUNITY'}</h3>
                  <button onClick={() => setEditingOpportunity(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSaveOpportunity} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Opportunity Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingOpportunity.title || ''} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, title: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Organization / Host *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingOpportunity.organization || ''} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, organization: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Category *</label>
                      <select 
                        value={editingOpportunity.category || 'Open Source'} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, category: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="Open Source">Open Source</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Internship Track">Internship Track</option>
                        <option value="Student Fellowship">Student Fellowship</option>
                        <option value="Competition">Competition</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Deadline Info *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingOpportunity.deadline || ''} 
                        placeholder="e.g. March 15 (Annual)" 
                        onChange={e => setEditingOpportunity({...editingOpportunity, deadline: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Required Skills (Comma separated) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingOpportunity.relevantSkills?.join(', ') || ''} 
                        placeholder="Python, Git, Web" 
                        onChange={e => setEditingOpportunity({
                          ...editingOpportunity, 
                          relevantSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Official Link URL *</label>
                      <input 
                        type="url" 
                        required 
                        value={editingOpportunity.officialUrl || ''} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, officialUrl: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Featured Badge (optional)</label>
                      <input 
                        type="text" 
                        value={editingOpportunity.featuredBadge || ''} 
                        placeholder="e.g. Flagship, Staging" 
                        onChange={e => setEditingOpportunity({...editingOpportunity, featuredBadge: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Accent Color Hex *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingOpportunity.accentColor || '#4285F4'} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, accentColor: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Eligibility Requirements *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingOpportunity.eligibility || ''} 
                      onChange={e => setEditingOpportunity({...editingOpportunity, eligibility: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Opportunity Description *</label>
                    <textarea 
                      required 
                      value={editingOpportunity.description || ''} 
                      rows={2} 
                      onChange={e => setEditingOpportunity({...editingOpportunity, description: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="flex items-center gap-4 bg-zinc-100 p-3 rounded">
                    <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 font-mono cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={editingOpportunity.isVerified !== false} 
                        onChange={e => setEditingOpportunity({...editingOpportunity, isVerified: e.target.checked})} 
                        className="border border-zinc-300 focus:outline-none"
                      />
                      <span>Mark as Verified Program</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                    <button type="button" onClick={() => setEditingOpportunity(null)} className="pixel-btn text-xs px-4 py-2 bg-zinc-100 font-bold">Cancel</button>
                    <button type="submit" className="pixel-btn-green text-xs px-6 py-2 flex items-center gap-1 font-bold shadow-[2px_2px_0px_#121212]"><Save className="w-4 h-4" />Save Opportunity</button>
                  </div>
                </form>
              </div>
            )}

            {/* List display */}
            <div className="border border-zinc-300 divide-y divide-zinc-200 font-mono text-xs">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-955">{opp.title}</span>
                      <span className="bg-zinc-100 text-zinc-700 border border-zinc-300 px-1.5 py-0.5 text-[9px] font-bold">{opp.category}</span>
                      {opp.featuredBadge && <span className="bg-[#FFD43B] text-zinc-900 border border-zinc-900 px-1 text-[9px] font-bold">{opp.featuredBadge}</span>}
                    </div>
                    <p className="text-zinc-500 text-[10px]">{opp.organization} • Deadline: {opp.deadline}</p>
                    <p className="text-zinc-600 text-[11px] font-sans">{opp.description.substring(0, 100)}...</p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] text-zinc-500">
                      <span>Live link:</span>
                      <Link to={`/opportunities/${opp.id}`} className="text-[#34A853] hover:underline">/opportunities/{opp.id}</Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-500">Show on Site:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!opp.hidden} 
                          onChange={() => handleToggleOpportunityVisibility(opp.id, opp.title, opp.hidden || false)} 
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    <button onClick={() => setEditingOpportunity(opp)} className="text-zinc-600 hover:text-zinc-900 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteOpportunity(opp.id, opp.title)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT PROJECTS MANAGER TAB */}
        {activeTab === 'projects' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-zinc-900" />
                <h2 className="text-xl font-extrabold text-zinc-900">Project Blueprints Manager</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetProjects} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
                <button
                  onClick={() => { setEditingProject({}); }}
                  className="pixel-btn-primary text-xs px-4 py-1.5 bg-[#4285F4] text-white flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project Blueprint</span>
                </button>
              </div>
            </div>

            {/* Project Blueprint form drawer */}
            {editingProject && (
              <div className="bg-zinc-50 p-6 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900">{editingProject.id ? 'EDIT BLUEPRINT' : 'CREATE BLUEPRINT'}</h3>
                  <button onClick={() => setEditingProject(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Blueprint Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.title || ''} 
                        onChange={e => setEditingProject({...editingProject, title: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Focus Domain *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.domain || ''} 
                        placeholder="e.g. AI & API Development" 
                        onChange={e => setEditingProject({...editingProject, domain: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Difficulty *</label>
                      <select 
                        value={editingProject.difficulty || 'Beginner'} 
                        onChange={e => setEditingProject({...editingProject, difficulty: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Estimated Time Required *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.estimatedHours || ''} 
                        placeholder="e.g., 10-15 Hours" 
                        onChange={e => setEditingProject({...editingProject, estimatedHours: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Starter GitHub Template URL</label>
                      <input 
                        type="url" 
                        value={editingProject.githubStarterTemplateUrl || ''} 
                        onChange={e => setEditingProject({...editingProject, githubStarterTemplateUrl: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Level Bracket *</label>
                      <select 
                        value={editingProject.levelNum || 1} 
                        onChange={e => {
                          const val = Number(e.target.value) as 1 | 2 | 3;
                          const labels = {
                            1: "Level 1: Fundamentals",
                            2: "Level 2: Real-World Apps",
                            3: "Level 3: Advanced Systems"
                          };
                          setEditingProject({
                            ...editingProject, 
                            levelNum: val,
                            level: labels[val] as any
                          });
                        }}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value={1}>Level 1: Fundamentals</option>
                        <option value={2}>Level 2: Real-World Apps</option>
                        <option value={3}>Level 3: Advanced Systems</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Problem Solved / Focus *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingProject.problemSolved || ''} 
                      onChange={e => setEditingProject({...editingProject, problemSolved: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Tech Stack (comma separated) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.techStack?.join(', ') || ''} 
                        placeholder="Python, FastAPI, SQLite" 
                        onChange={e => setEditingProject({
                          ...editingProject, 
                          techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">What You Will Learn (comma separated) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingProject.whatYouWillLearn?.join(', ') || ''} 
                        placeholder="JSON parsing, API security" 
                        onChange={e => setEditingProject({
                          ...editingProject, 
                          whatYouWillLearn: e.target.value.split(',').map(w => w.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Feature Checklist Goals (comma separated) *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingProject.keyFeatures?.join(', ') || ''} 
                      placeholder="Add logging, Implement caching" 
                      onChange={e => setEditingProject({
                        ...editingProject, 
                        keyFeatures: e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                      })} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                    <button type="button" onClick={() => setEditingProject(null)} className="pixel-btn text-xs px-4 py-2 bg-zinc-100 font-bold">Cancel</button>
                    <button type="submit" className="pixel-btn-primary px-6 py-2 bg-[#4285F4] text-white flex items-center gap-1 font-bold shadow-[2px_2px_0px_#121212]"><Save className="w-4 h-4" />Save Blueprint</button>
                  </div>
                </form>
              </div>
            )}

            {/* List display */}
            <div className="border border-zinc-300 divide-y divide-zinc-200 font-mono text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-900">{proj.title}</span>
                      <span className="bg-zinc-100 text-zinc-600 border border-zinc-300 px-1.5 py-0.5 text-[9px] font-bold">{proj.level}</span>
                      <span className="bg-blue-50 text-blue-800 px-1 py-0.5 text-[9px] rounded font-bold">{proj.difficulty}</span>
                    </div>
                    <p className="text-zinc-500 text-[10px]">{proj.domain} • Tech: {proj.techStack.join(', ')}</p>
                    <p className="text-zinc-600 text-[11px] font-sans">{proj.problemSolved}</p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] text-zinc-500">
                      <span>Live link:</span>
                      <Link to={`/paths/${proj.id}`} className="text-[#4285F4] hover:underline">/paths/{proj.id}</Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-500">Show on Site:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!proj.hidden} 
                          onChange={() => handleToggleProjectVisibility(proj.id, proj.title, proj.hidden || false)} 
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    <button onClick={() => setEditingProject(proj)} className="text-zinc-600 hover:text-zinc-900 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteProject(proj.id, proj.title)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT JOURNEY DOMAINS TRACKS MANAGER TAB */}
        {activeTab === 'domains' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-extrabold text-zinc-900">Python Journey Domains</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetDomains} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
                <button
                  onClick={() => { setEditingDomain({}); }}
                  className="pixel-btn text-xs px-4 py-1.5 bg-orange-600 text-white flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Journey Track</span>
                </button>
              </div>
            </div>

            {/* Journey Domain form drawer */}
            {editingDomain && (
              <div className="bg-zinc-50 p-6 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900">{editingDomain.id ? 'EDIT ROADMAP TRACK' : 'CREATE ROADMAP TRACK'}</h3>
                  <button onClick={() => setEditingDomain(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSaveDomain} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Domain Title *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.title || ''} 
                        placeholder="e.g. AI & Machine Learning"
                        onChange={e => setEditingDomain({...editingDomain, title: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Dynamic Path ID (slug) *</label>
                      <input 
                        type="text" 
                        required 
                        disabled={!!editingDomain.id}
                        value={editingDomain.id || ''} 
                        placeholder="e.g. ai-machine-learning"
                        onChange={e => setEditingDomain({...editingDomain, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none disabled:bg-zinc-150" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Tagline / Mission Quote *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.tagline || ''} 
                        placeholder="e.g. Turn raw data into predictive assets."
                        onChange={e => setEditingDomain({...editingDomain, tagline: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Sticker Icon Name *</label>
                      <select 
                        value={editingDomain.iconName || 'PixelPython'} 
                        onChange={e => setEditingDomain({...editingDomain, iconName: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="PixelPython">PixelPython</option>
                        <option value="PixelTerminal">PixelTerminal</option>
                        <option value="PixelCompass">PixelCompass</option>
                        <option value="PixelBrowser">PixelBrowser</option>
                        <option value="PixelAIBrain">PixelAIBrain</option>
                        <option value="PixelBook">PixelBook</option>
                        <option value="PixelLaptop">PixelLaptop</option>
                        <option value="PixelTrophy">PixelTrophy</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Track Badge Text *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.badgeText || ''} 
                        placeholder="e.g., AI & MATH MODELING"
                        onChange={e => setEditingDomain({...editingDomain, badgeText: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Badge Background Tailwind Class *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.badgeBg || 'bg-amber-100'} 
                        placeholder="bg-amber-100 text-amber-900 border-amber-900"
                        onChange={e => setEditingDomain({...editingDomain, badgeBg: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Short Card Summary *</label>
                    <input 
                      type="text" 
                      required 
                      value={editingDomain.shortDesc || ''} 
                      onChange={e => setEditingDomain({...editingDomain, shortDesc: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Detailed Definition (what it is) *</label>
                      <textarea 
                        required 
                        value={editingDomain.whatItIs || ''} 
                        rows={2} 
                        onChange={e => setEditingDomain({...editingDomain, whatItIs: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Why Python Leads (relevance) *</label>
                      <textarea 
                        required 
                        value={editingDomain.whyPython || ''} 
                        rows={2} 
                        onChange={e => setEditingDomain({...editingDomain, whyPython: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Applications (comma sep) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.realWorldUse?.join(', ') || ''} 
                        placeholder="Image recognition, Chatbots"
                        onChange={e => setEditingDomain({
                          ...editingDomain, 
                          realWorldUse: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Libraries/Tools (comma sep) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.coreLibraries?.join(', ') || ''} 
                        placeholder="PyTorch, NumPy, Pandas"
                        onChange={e => setEditingDomain({
                          ...editingDomain, 
                          coreLibraries: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Roadmap Steps (comma sep) *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingDomain.learningSteps?.join(', ') || ''} 
                        placeholder="Learn calculus, Install CUDA, Train models"
                        onChange={e => setEditingDomain({
                          ...editingDomain, 
                          learningSteps: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                        })} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  {/* Fallback Static Project Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-100 p-4 border border-zinc-300">
                    <div className="space-y-2">
                      <h4 className="font-pixel text-[10px] text-zinc-900 font-bold uppercase">BEGINNER PROJECT SPEC</h4>
                      <input 
                        type="text" 
                        placeholder="Project Title"
                        value={editingDomain.beginnerProject?.title || ''}
                        onChange={e => setEditingDomain({
                          ...editingDomain,
                          beginnerProject: {
                            title: e.target.value,
                            description: editingDomain.beginnerProject?.description || '',
                            tech: editingDomain.beginnerProject?.tech || []
                          }
                        })}
                        className="w-full text-xs font-mono px-2 py-1.5 border border-zinc-300 focus:outline-none mb-1"
                      />
                      <textarea 
                        placeholder="Project description details..."
                        value={editingDomain.beginnerProject?.description || ''}
                        onChange={e => setEditingDomain({
                          ...editingDomain,
                          beginnerProject: {
                            title: editingDomain.beginnerProject?.title || '',
                            description: e.target.value,
                            tech: editingDomain.beginnerProject?.tech || []
                          }
                        })}
                        className="w-full text-xs font-mono px-2 py-1.5 border border-zinc-300 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-pixel text-[10px] text-zinc-900 font-bold uppercase">INTERMEDIATE PROJECT SPEC</h4>
                      <input 
                        type="text" 
                        placeholder="Project Title"
                        value={editingDomain.intermediateProject?.title || ''}
                        onChange={e => setEditingDomain({
                          ...editingDomain,
                          intermediateProject: {
                            title: e.target.value,
                            description: editingDomain.intermediateProject?.description || '',
                            tech: editingDomain.intermediateProject?.tech || []
                          }
                        })}
                        className="w-full text-xs font-mono px-2 py-1.5 border border-zinc-300 focus:outline-none mb-1"
                      />
                      <textarea 
                        placeholder="Project description details..."
                        value={editingDomain.intermediateProject?.description || ''}
                        onChange={e => setEditingDomain({
                          ...editingDomain,
                          intermediateProject: {
                            title: editingDomain.intermediateProject?.title || '',
                            description: e.target.value,
                            tech: editingDomain.intermediateProject?.tech || []
                          }
                        })}
                        className="w-full text-xs font-mono px-2 py-1.5 border border-zinc-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                    <button type="button" onClick={() => setEditingDomain(null)} className="pixel-btn text-xs px-4 py-2 bg-zinc-100 font-bold">Cancel</button>
                    <button type="submit" className="pixel-btn text-xs bg-orange-600 text-white px-6 py-2 flex items-center gap-1 font-bold shadow-[2px_2px_0px_#121212]"><Save className="w-4 h-4" />Save Journey Track</button>
                  </div>
                </form>
              </div>
            )}

            {/* List display */}
            <div className="border border-zinc-300 divide-y divide-zinc-200 font-mono text-xs">
              {domains.map((dom) => (
                <div key={dom.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-900">{dom.title}</span>
                      <span className="bg-zinc-100 text-zinc-600 border border-zinc-300 px-1.5 py-0.5 text-[9px] font-bold">{dom.badgeText}</span>
                    </div>
                    <p className="text-zinc-600 text-[11px] font-sans">{dom.shortDesc}</p>
                    <div className="pt-1 flex items-center gap-1 text-[10px] text-zinc-500">
                      <span>Live link:</span>
                      <Link to={`/journey/${dom.id}`} className="text-orange-600 hover:underline">/journey/{dom.id}</Link>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-500">Show on Site:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!dom.hidden} 
                          onChange={() => handleToggleDomainVisibility(dom.id, dom.title, dom.hidden || false)} 
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    <button onClick={() => setEditingDomain(dom)} className="text-zinc-600 hover:text-zinc-900 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteDomain(dom.id, dom.title)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT CORE MAINTAINERS MANAGER TAB */}
        {activeTab === 'maintainers' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-zinc-900" />
                <h2 className="text-xl font-extrabold text-zinc-900">Core Maintainers Team Manager</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleResetMaintainers} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
                <button
                  onClick={() => { setEditingMaintainer({}); }}
                  className="pixel-btn text-xs px-4 py-1.5 bg-zinc-950 text-white flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Maintainer</span>
                </button>
              </div>
            </div>

            {/* Maintainer form drawer */}
            {editingMaintainer && (
              <div className="bg-zinc-50 p-6 border-2 border-zinc-900 shadow-[3px_3px_0px_#121212] space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900">{editingMaintainer.id ? 'EDIT MAINTAINER' : 'CREATE MAINTAINER'}</h3>
                  <button onClick={() => setEditingMaintainer(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSaveMaintainer} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingMaintainer.name || ''} 
                        onChange={e => setEditingMaintainer({...editingMaintainer, name: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Role Description *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingMaintainer.role || ''} 
                        placeholder="e.g. Core Maintainer" 
                        onChange={e => setEditingMaintainer({...editingMaintainer, role: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Category *</label>
                      <select 
                        value={editingMaintainer.category || 'Core Team'} 
                        onChange={e => setEditingMaintainer({...editingMaintainer, category: e.target.value as any})}
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none"
                      >
                        <option value="Lead">Lead</option>
                        <option value="Core Team">Core Team</option>
                        <option value="Class Representative">Class Representative</option>
                        <option value="Advisor">Advisor</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Focus Domain *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingMaintainer.focusDomain || ''} 
                        placeholder="e.g., AI Tracking & Machine Learning" 
                        onChange={e => setEditingMaintainer({...editingMaintainer, focusDomain: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">GitHub Profile Link (optional)</label>
                      <input 
                        type="url" 
                        value={editingMaintainer.githubUrl || ''} 
                        onChange={e => setEditingMaintainer({...editingMaintainer, githubUrl: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">LinkedIn Profile Link (optional)</label>
                      <input 
                        type="url" 
                        value={editingMaintainer.linkedinUrl || ''} 
                        onChange={e => setEditingMaintainer({...editingMaintainer, linkedinUrl: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">Avatar Pixel Class Style *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingMaintainer.avatarPixelBg || 'bg-zinc-100 text-zinc-900 border-zinc-900'} 
                        placeholder="bg-blue-100 text-blue-900 border-blue-900" 
                        onChange={e => setEditingMaintainer({...editingMaintainer, avatarPixelBg: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-zinc-700 font-mono">University Info *</label>
                      <input 
                        type="text" 
                        required 
                        value={editingMaintainer.university || 'Atmiya University, Rajkot'} 
                        onChange={e => setEditingMaintainer({...editingMaintainer, university: e.target.value})} 
                        className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Maintainer Bio Description *</label>
                    <textarea 
                      required 
                      value={editingMaintainer.bio || ''} 
                      rows={2} 
                      onChange={e => setEditingMaintainer({...editingMaintainer, bio: e.target.value})} 
                      className="w-full text-xs font-mono px-3 py-2 border border-zinc-300 focus:outline-none" 
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                    <button type="button" onClick={() => setEditingMaintainer(null)} className="pixel-btn text-xs px-4 py-2 bg-zinc-100 font-bold">Cancel</button>
                    <button type="submit" className="pixel-btn text-xs bg-zinc-950 text-white px-6 py-2 flex items-center gap-1 font-bold shadow-[2px_2px_0px_#121212]"><Save className="w-4 h-4" />Save Maintainer</button>
                  </div>
                </form>
              </div>
            )}

            {/* List display */}
            <div className="border border-zinc-300 divide-y divide-zinc-200 font-mono text-xs">
              {maintainers.map((maint) => (
                <div key={maint.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-sm text-zinc-900">{maint.name}</span>
                      <span className="bg-zinc-100 text-zinc-600 border border-zinc-300 px-1.5 py-0.5 text-[9px] font-bold">{maint.category}</span>
                      <span className="text-[10px] text-zinc-400">{maint.role}</span>
                    </div>
                    <p className="text-zinc-500 text-[10px]">{maint.focusDomain} • {maint.university}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-500">Show on Site:</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!maint.hidden} 
                          onChange={() => handleToggleMaintainerVisibility(maint.id, maint.name, maint.hidden || false)} 
                          className="sr-only peer"
                        />
                        <div className="w-7 h-4 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                    
                    <button onClick={() => setEditingMaintainer(maint)} className="text-zinc-600 hover:text-zinc-900 p-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteMaintainer(maint.id, maint.name)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CMS GENERAL BRANDING & SECURITY SETTINGS TAB */}
        {activeTab === 'general' && (
          <div className="pixel-card-static p-6 sm:p-8 bg-white border-2 border-zinc-900 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-extrabold text-zinc-900">General Branding & Admin Credentials</h2>
              </div>
              <button onClick={handleResetGeneralSettings} className="pixel-btn text-xs px-3 py-1.5 bg-zinc-100 flex items-center gap-1.5 font-bold"><RefreshCw className="w-3.5 h-3.5" />Reset to Code Defaults</button>
            </div>

            <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Branding section */}
                <div className="space-y-4">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900 border-b-2 border-dashed border-zinc-200 pb-1.5 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-purple-500" />
                    <span>Branding Identity</span>
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Club Name Label *</label>
                    <input 
                      type="text"
                      required
                      value={generalSettings.clubName}
                      onChange={e => setGeneralSettingsState({...generalSettings, clubName: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Club Community Slogan *</label>
                    <textarea 
                      required
                      rows={3}
                      value={generalSettings.clubSlogan}
                      onChange={e => setGeneralSettingsState({...generalSettings, clubSlogan: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Support Contact Email *</label>
                    <input 
                      type="email"
                      required
                      value={generalSettings.contactEmail}
                      onChange={e => setGeneralSettingsState({...generalSettings, contactEmail: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Social links & credentials section */}
                <div className="space-y-4">
                  <h3 className="font-pixel text-xs font-bold text-zinc-900 border-b-2 border-dashed border-zinc-200 pb-1.5 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-red-500" />
                    <span>Community Links & Security Access</span>
                  </h3>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">WhatsApp Group Invite URL *</label>
                    <input 
                      type="url"
                      required
                      value={generalSettings.whatsappUrl}
                      onChange={e => setGeneralSettingsState({...generalSettings, whatsappUrl: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-zinc-700 font-mono">Discord Server Invite URL *</label>
                    <input 
                      type="url"
                      required
                      value={generalSettings.discordUrl}
                      onChange={e => setGeneralSettingsState({...generalSettings, discordUrl: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border-2 border-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 bg-red-50 p-4 border border-red-200 rounded">
                    <label className="block text-xs font-bold text-red-950 font-mono mb-1">Update Administrator Password *</label>
                    <input 
                      type="password"
                      required
                      value={generalSettings.adminPassword || ''}
                      onChange={e => setGeneralSettingsState({...generalSettings, adminPassword: e.target.value})}
                      className="w-full text-xs font-mono px-3 py-2 border border-red-400 focus:outline-none bg-white"
                      placeholder="adscpyadmin"
                    />
                    <p className="text-[10px] text-red-700 mt-1 font-mono leading-relaxed">
                      Changing this will require utilizing the new password for future dashboard access.
                    </p>
                  </div>
                </div>

              </div>

              {/* Dynamic sitemap downloader section */}
              <div className="bg-zinc-950 text-white p-6 border-2 border-zinc-900 space-y-4">
                <h3 className="font-pixel text-xs font-bold text-[#FFD43B] flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>DYNAMIC SITEMAP GENERATOR</span>
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono leading-relaxed max-w-2xl">
                  This tool crawls your dynamic workshops, opportunities, and projects in localStorage and compiles a standard, production-ready sitemap.xml.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadSitemap}
                  className="pixel-btn-python text-xs px-4 py-2 flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#ffffff]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex justify-end">
                <button
                  type="submit"
                  className="pixel-btn-python px-6 py-2.5 text-xs flex items-center gap-1.5 font-bold shadow-[2px_2px_0px_#121212]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings & Branding</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </Shell>
  );
}
