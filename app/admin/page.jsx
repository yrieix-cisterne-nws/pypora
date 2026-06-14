import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminTutorielRow from "@/components/admin/AdminTutorielRow";

export default async function Admin() {
  const tutoriels = await prisma.tutoriel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 px-4 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tutoriels</h1>
            <p className="text-sm text-gray-400 mt-0.5">{tutoriels.length} tutoriel{tutoriels.length !== 1 ? "s" : ""}</p>
          </div>
          <Link
            href="/admin/tutoriels/nouveau"
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Nouveau tutoriel</span>
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto">
          {tutoriels.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              Aucun tutoriel. <Link href="/admin/tutoriels/nouveau" className="text-violet-600 hover:underline">Créer le premier</Link>
            </div>
          ) : (
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Titre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell w-28">Catégorie</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell w-24">Créé le</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tutoriels.map(t => (
                  <AdminTutorielRow key={t.id} tutoriel={t} />
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
