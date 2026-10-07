import { Github, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-surface/50 px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary p-8 text-center text-white shadow-warm-lg md:flex-row md:text-left">
          <div>
            <h3 className="mb-2 text-2xl font-bold">
              Ready to close your skill gap?
            </h3>
            <p className="text-white/90">
              Analyze your profile and get a personalized career roadmap in
              seconds.
            </p>
          </div>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-primary transition hover:bg-gray-50"
          >
            Try SkillPilot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-brand-muted">
            SkillPilot — Built with Python, scikit-learn, XGBoost, and FastAPI.
            Deployed on Vercel.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
