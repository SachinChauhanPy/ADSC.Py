import { type Session } from '../data/sessions';
import { type ProjectBlueprint } from '../data/projects';

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ADSC.Py",
    "alternateName": "Atmiya Developer Students Club",
    "description": "The student-led Python developer community at Atmiya University, Rajkot, Gujarat, India.",
    "url": "https://adscpy.atmiyadevelopers.org",
    "logo": "https://adscpy.atmiyadevelopers.org/python_logo.png",
    "parentOrganization": {
      "@type": "CollegeOrUniversity",
      "name": "Atmiya University",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "addressCountry": "India"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalavad Road",
      "addressLocality": "Rajkot",
      "addressRegion": "Gujarat",
      "postalCode": "360005",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.2858,
      "longitude": 70.7744
    },
    "sameAs": [
      "https://github.com/ADSC-Py"
    ]
  };
}

export function getBreadcrumbsSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `https://adscpy.atmiyadevelopers.org${item.item}`
    }))
  };
}

export function getEventSchema(session: Session) {
  const isUpcoming = session.status === 'Upcoming';
  const eventDate = isUpcoming ? "2026-09-12T10:00:00+05:30" : "2026-01-01T10:00:00+05:30";
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": session.title,
    "description": session.description,
    "startDate": eventDate,
    "endDate": eventDate,
    "eventStatus": isUpcoming ? "https://schema.org/EventScheduled" : "https://schema.org/EventMovedOnline",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": session.resources?.githubRepo || "https://adscpy.atmiyadevelopers.org/sessions"
    },
    "organizer": {
      "@type": "Organization",
      "name": "ADSC.Py",
      "url": "https://adscpy.atmiyadevelopers.org"
    },
    "performer": {
      "@type": "Person",
      "name": session.speaker.name,
      "jobTitle": session.speaker.role
    },
    "about": {
      "@type": "Thing",
      "name": session.domain
    }
  };
}

export function getCourseSchema(project: ProjectBlueprint) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": project.title,
    "description": project.problemSolved,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ADSC.Py",
      "url": "https://adscpy.atmiyadevelopers.org"
    },
    "educationalLevel": project.difficulty,
    "about": {
      "@type": "Thing",
      "name": project.domain
    }
  };
}
