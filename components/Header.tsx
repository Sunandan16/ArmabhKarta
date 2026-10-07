'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Roles', href: '#roles' },
  { label: 'Enterprise', href: '/enterprise' },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const className =
    'text-sm font-medium text-brand-muted transition-colors hover:text-brand-navy';
  if (href.startsWith('/')) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className={className}>
      {label}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-brand-border bg-[var(--panel-bg)] backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-warm-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-navy">
            SkillPilot AI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/demo"
            className="hidden rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white shadow-warm-md transition hover:bg-gray-800 sm:inline-flex"
          >
            Try Demo
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex rounded-lg p-2 text-brand-muted hover:bg-surface lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-border bg-[var(--panel-bg)] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
            <a
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
