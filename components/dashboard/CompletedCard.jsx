import Link from "next/link";

export default function CompletedCard({ title, category, slug }) {
  return (
    <Link
      href={`/tutoriels/${slug}`}
      className="border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-2 text-center bg-white hover:border-green-300 hover:shadow-sm transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">{title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{category}</p>
        <p className="text-xs text-green-600 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Revoir →</p>
      </div>
    </Link>
  );
}
