import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import type { MetaFunction, LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const meta: MetaFunction = () => {
  return [
    { title: "ADSC.Py — Atmiya Developer Students Club" },
    { name: "description", content: "The Python Community at Atmiya University, Rajkot." },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }
  ];
};

import { getOrganizationSchema } from './lib/schemaHelper';

export function Layout({ children }: { children: React.ReactNode }) {
  const orgSchema = getOrganizationSchema();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
