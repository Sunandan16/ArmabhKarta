'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Roles', href: '#roles' },
  { label: 'Tech stack', href: '#tech-stack' },
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
    'text-sm font-medium text-gray-600 transition-colors hover:text-primary';
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
    <header className="sticky top-0 z-50 w-full border-b border-primary-light bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          SkillPilot
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#demo"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-primary-hover sm:inline-flex"
          >
            Try Demo
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex rounded-lg p-2 text-gray-600 hover:bg-surface lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-primary-light bg-white px-4 py-4 lg:hidden">
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
              href="#demo"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              Try Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
