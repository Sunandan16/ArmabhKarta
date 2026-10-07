import { Demo } from '@/components/Demo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-muted transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
      <Demo />
    </main>
  );
}
