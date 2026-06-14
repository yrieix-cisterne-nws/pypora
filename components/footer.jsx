import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm text-gray-900">Pypora</p>
          <p className="text-xs text-gray-400 mt-0.5">© 2026 Pypora</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="mentions" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Mentions légales</Link>
          <p className="text-xs">Travail pédagogique sans objectifs commerciaux</p>
        </div>
      </div>
    </footer>
  );
}