import { Server, Database, Globe, LucideIcon } from 'lucide-react';

const categories = [
  {
    title: 'Backend & ML',
    icon: Server,
    items: ['Python 3.12', 'FastAPI', 'scikit-learn', 'XGBoost', 'Pandas', 'NumPy'],
  },
  {
    title: 'Data & Intelligence',
    icon: Database,
    items: [
      'Role-Skill Matrix',
      'Skill Dictionary',
      'NVIDIA NIM LLM',
      'Outcome Classifiers',
    ],
  },
  {
    title: 'Frontend & Deploy',
    icon: Globe,
    items: ['Next.js', 'React', 'Vercel', 'ngrok'],
  },
];

function TechCard({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-brand-border bg-[var(--panel-bg)] p-7 shadow-warm-md backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-warm-lg">
      <div className="mb-5 inline-flex rounded-2xl bg-surface p-3.5 text-primary">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-4 text-xl font-semibold text-brand-navy">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex rounded-lg border border-brand-border bg-surface px-3 py-1.5 text-sm font-medium text-brand-navy"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech-stack" className="bg-[var(--background)] px-4 py-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Stack
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand-navy md:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-brand-muted">
            Built with modern Python ML tools and served through a clean FastAPI
            + Vercel architecture.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <TechCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
