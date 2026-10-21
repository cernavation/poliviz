import type { Metadata } from "next";
import { SITE } from "../../../content/site.config";
import { resolveMedia } from "@/lib/resolve-media";
import { VacanciesClient } from "./VacanciesClient";

export const metadata: Metadata = {
  title: "Вакансии / Cariere / Careers",
  description: `Вакансии в типографии ${SITE.name}, Кишинёв.`,
};

export default function VacanciesPage() {
  const handsMedia = resolveMedia("/media/photo/team/hands-operator.jpg", "photo-hands");

  return <VacanciesClient handsMedia={handsMedia} />;
}
