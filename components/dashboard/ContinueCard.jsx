import Link from "next/link";

export default function ContinueCard({ title, category, slug, completed }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      <div className="relative h-28 bg-gradient-to-br from-violet-950 to-pink-900 flex items-center justify-center">
        <span className="absolute top-2 left-2 text-xs font-semibold text-white bg-violet-700 px-2 py-0.5 rounded-full">
          {category}
        </span>
        {completed && (
          <span className="text-xs font-semibold text-white bg-green-600 px-2 py-0.5 rounded-full">
            Terminé
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{title}</h3>
        <div className="h-0.5 w-full bg-gray-100 rounded-full">
          <div
            className={`h-0.5 rounded-full ${completed ? "bg-green-500" : "bg-violet-600"}`}
            style={{ width: completed ? "100%" : "10%" }}
          />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400">{completed ? "100%" : "En cours"}</span>
          <Link
            href={`/tutoriels/${slug}`}
            className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 transition-colors"
          >
            {completed ? "Revoir" : "Reprendre"}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
