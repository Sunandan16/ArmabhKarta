'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Download, Loader2, RefreshCw, Trophy } from 'lucide-react';

interface SuggestedSkill {
  skill: string;
  importance: number;
  status: string;
}

interface VerifiedSkill {
  skill: string;
  verified_at: string;
}

interface UserProfile {
  user_id: string;
  name?: string;
  email?: string;
  target_role: string;
  extracted_skills: string[];
  suggested_skills: SuggestedSkill[];
  verified_skills: VerifiedSkill[];
}

interface QuizQuestion {
  question: string;
  options: string[];
}

interface QuizResult {
  skill: string;
  score: number;
  total: number;
  passed: boolean;
  message: string;
}

interface UserDashboardProps {
  userId: string;
  apiBase: string;
}

export function UserDashboard({ userId, apiBase }: UserDashboardProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [quizSkill, setQuizSkill] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  };

  async function fetchProfile() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/users/${userId}`, { headers });
      if (!res.ok) throw new Error('Failed to load profile');
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function startQuiz(skill: string) {
    setQuizSkill(skill);
    setQuizResult(null);
    setAnswers([]);
    setQuizLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/skills/${encodeURIComponent(skill)}/quiz`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) throw new Error('Failed to generate quiz');
      const data = await res.json();
      setAttemptId(data.attempt_id);
      setQuizQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(-1));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setQuizSkill(null);
    } finally {
      setQuizLoading(false);
    }
  }

  async function submitQuiz() {
    if (!quizSkill || attemptId === null) return;
    setQuizLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${apiBase}/skills/${encodeURIComponent(quizSkill)}/submit-quiz`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ user_id: userId, attempt_id: attemptId, answers }),
        }
      );
      if (!res.ok) throw new Error('Failed to submit quiz');
      const data = await res.json();
      setQuizResult(data);
      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setQuizLoading(false);
    }
  }

  function closeQuiz() {
    setQuizSkill(null);
    setQuizQuestions([]);
    setAttemptId(null);
    setAnswers([]);
    setQuizResult(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-muted">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading your dashboard...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        <p className="font-semibold">Dashboard error</p>
        <p className="text-sm">{error || 'Could not load profile'}</p>
      </div>
    );
  }

  const verifiedSet = new Set(profile.verified_skills.map((v) => v.skill));

  return (
    <div className="mt-10 space-y-8">
      <div className="rounded-xl border border-primary-light bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Your profile</h3>
        <p className="text-sm text-muted">
          Target role: <span className="font-medium text-gray-900">{profile.target_role}</span>
        </p>
        <p className="mt-2 text-sm text-muted">
          Extracted skills:{' '}
          {profile.extracted_skills.length > 0
            ? profile.extracted_skills.join(', ')
            : 'None extracted'}
        </p>
      </div>

      {profile.verified_skills.length > 0 && (
        <div className="rounded-xl border border-primary-light bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Trophy className="h-5 w-5 text-primary" />
            Verified skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.verified_skills.map((v) => (
              <span
                key={v.skill}
                className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                {v.skill}
              </span>
            ))}
          </div>
          <a
            href={`${apiBase}/users/${userId}/updated-resume`}
            download
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            <Download className="h-4 w-4" />
            Download updated resume
          </a>
        </div>
      )}

      <div className="rounded-xl border border-primary-light bg-white p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <RefreshCw className="h-5 w-5 text-primary" />
          Suggested skills
        </h3>
        {profile.suggested_skills.length === 0 ? (
          <p className="text-sm text-muted">No suggested skills yet.</p>
        ) : (
          <ul className="space-y-3">
            {profile.suggested_skills.map((s) => {
              const isVerified = verifiedSet.has(s.skill);
              return (
                <li
                  key={s.skill}
                  className="flex flex-col gap-2 rounded-lg border border-primary-light p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{s.skill}</p>
                    <p className="text-xs text-muted">importance: {s.importance.toFixed(3)}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {s.status}
                    </p>
                  </div>
                  <div>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => startQuiz(s.skill)}
                        disabled={quizLoading}
                        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
                      >
                        {quizLoading && quizSkill === s.skill ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Generating quiz...
                          </span>
                        ) : (
                          'Take Quiz'
                        )}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {quizSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Quiz: {quizSkill}</h3>
              <button
                onClick={closeQuiz}
                className="text-sm text-muted hover:text-gray-900"
              >
                Close
              </button>
            </div>

            {quizResult ? (
              <div className="space-y-4">
                <div
                  className={`rounded-xl p-4 text-center ${
                    quizResult.passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  <p className="text-2xl font-bold">
                    {quizResult.score} / {quizResult.total}
                  </p>
                  <p className="mt-1 font-medium">{quizResult.message}</p>
                </div>
                <button
                  onClick={closeQuiz}
                  className="w-full rounded-xl bg-primary py-2 font-semibold text-white hover:bg-primary-hover"
                >
                  Done
                </button>
              </div>
            ) : quizQuestions.length === 0 ? (
              <div className="flex items-center justify-center gap-2 py-10 text-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating questions with AI...
              </div>
            ) : (
              <div className="space-y-6">
                {quizQuestions.map((q, idx) => (
                  <div key={idx}>
                    <p className="mb-2 font-medium text-gray-900">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary-light p-3 hover:bg-surface"
                        >
                          <input
                            type="radio"
                            name={`q-${idx}`}
                            checked={answers[idx] === optIdx}
                            onChange={() => {
                              const next = [...answers];
                              next[idx] = optIdx;
                              setAnswers(next);
                            }}
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="text-sm text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={submitQuiz}
                  disabled={quizLoading || answers.some((a) => a === -1)}
                  className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-primary-hover disabled:opacity-60"
                >
                  {quizLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit Quiz'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
