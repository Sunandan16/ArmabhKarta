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
    <div className="rounded-xl border border-primary-light bg-white p-6 shadow-card">
      <div className="mb-4 inline-flex rounded-lg bg-surface p-3 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech-stack" className="bg-surface px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
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
