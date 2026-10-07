export interface Candidate {
  id: number;
  name: string;
  role: string;
  skills: string[];
  expected_salary: number;
  source: 'auto' | 'manual';
}

export interface Employee {
  name: string;
  current_skills: string[];
  personality?: {
    neuroticism?: number;
    extraversion?: number;
    openness?: number;
    agreeableness?: number;
    conscientiousness?: number;
  };
  current_salary: number;
  max_skills_to_train: number;
}

export interface Department {
  department_id: string;
  name: string;
  target_role: string;
  budget: number;
  time_horizon_months: number;
  employees: Employee[];
  candidates: Candidate[];
  latest_plan: Plan | null;
}

export interface PlanAction {
  type: 'hire' | 'upskill';
  candidate_id?: number;
  candidate_name?: string;
  employee_id?: number;
  employee_name?: string;
  skill?: string;
  cost: number;
  duration_months: number | null;
}

export interface Plan {
  department_id: string;
  status: string;
  actions: PlanAction[];
  total_cost: number;
  build_cost: number;
  buy_cost: number;
  budget_remaining: number;
  months_remaining: number;
  coverage: number;
  success_probability: number;
  efv_score: number;
  recommendation: string;
}

export interface WorthItAnalysis {
  budget_used: number;
  budget_remaining: number;
  coverage: number;
  predicted_team_success: number;
  savings_vs_full_external_hire_estimate: number;
  roi_score: number;
  verdict: string;
}

export interface Report {
  department: Department;
  plan: Plan;
  worth_it_analysis: WorthItAnalysis;
}

export const ROLES = [
  { value: 'data_scientist', label: 'Data Scientist' },
  { value: 'data_analyst', label: 'Data Analyst' },
  { value: 'data_engineer', label: 'Data Engineer' },
  { value: 'ml_engineer', label: 'ML Engineer' },
];
