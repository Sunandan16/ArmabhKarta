import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-primary-light bg-white px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted md:text-left">
          SkillPilot — Built with Python, scikit-learn, XGBoost, and FastAPI.
          Deployed on Vercel.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-primary"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
