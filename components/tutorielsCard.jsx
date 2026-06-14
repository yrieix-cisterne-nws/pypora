const difficultyConfig = {
  Débutant:      "text-emerald-600",
  Intermédiaire: "text-amber-500",
  Avancé:        "text-rose-500",
};

import Link from "next/link";

export default function TutorielsCard({ title, slug, category, difficulty, description}) {
  const diffColor = difficultyConfig[difficulty] ?? "text-gray-500";

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <span className="inline-block text-xs font-semibold text-white bg-violet-700 px-2.5 py-0.5 rounded-full">
          {category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <p className={`text-xs font-medium ${diffColor}`}>
          {difficulty}
        </p>
        <div>
          <h3 className="font-bold text-gray-900 mb-1 leading-snug">{title}</h3>
          {description && <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{description}</p>}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Link href={`/tutoriels/${slug}`} className="text-violet-700 hover:text-violet-900 transition-colors" aria-label={`Voir ${title}`}>
            <p>Accéder au tutoriel</p>
          </Link>
        </div>

      </div>
    </div>
  );
}