import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbsSchema } from '../../lib/schemaHelper';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Home', item: '/' },
    ...items
  ];

  const schema = getBreadcrumbsSchema(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav 
        aria-label="Breadcrumb" 
        className="inline-flex items-center gap-1.5 bg-zinc-50 border-2 border-zinc-900 px-3.5 py-1.5 font-mono text-[11px] font-bold text-zinc-500 shadow-[2px_2px_0px_#121212] max-w-full flex-wrap overflow-hidden"
      >
        <Link 
          to="/" 
          className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900 hover:underline"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.item + idx}>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              {isLast ? (
                <span className="text-[#EA4335] select-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.item} 
                  className="text-zinc-700 hover:text-zinc-900 hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
