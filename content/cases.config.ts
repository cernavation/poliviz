// ============================================================
// cases.config.ts — портфолио кейсов (пока пусто)
// Блок на странице /klienty скрыт пока список пуст.
// ============================================================

export interface CaseStudy {
  id: string;
  client: string;
  title: { ru: string; ro: string };
  description: { ru: string; ro: string };
  technologies: string[];
  photo: string;
}

// TODO(client): добавить реальные кейсы с фото и описанием
export const CASES: CaseStudy[] = [];

export const CASES_VISIBLE = CASES.length > 0;
