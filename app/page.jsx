import { prisma } from "@/lib/prisma";
import TutorielsCard from "@/components/tutorielsCard";
import Link from "next/link";

export default async function Home() {
  const [categories, tutoriels] = await Promise.all([
    prisma.categorie.findMany({ orderBy: { name: "asc" } }),
    prisma.tutoriel.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8 py-10 md:py-14 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Apprenez à votre rythme</h1>
          <p className="text-sm text-gray-600 mb-7">
            Découvrez une collection de tutoriels couvrant la programmation et les APIs.
            Que vous soyez débutant ou expert, notre plateforme offre des ressources adaptées à tous les niveaux.
          </p>
          <Link
            href="/tutoriels"
            className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Voir tous les tutoriels
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <img src="/image_pc.avif" alt="Image de bienvenue" className="w-full h-60 object-cover" />
        </div>
      </div>
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto flex items-center gap-3 px-4 sm:px-8 py-3 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">
            Catégories
          </span>
          {categories.length === 0 ? (
            <span className="text-xs text-gray-400">Aucune catégorie</span>
          ) : (
            categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/tutoriels?category=${cat.slug}`}
                className="shrink-0 text-xs font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1 rounded-full transition-colors"
              >
                {cat.name}
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Tutoriels à la une</h2>
          <Link href="/tutoriels" className="text-xs text-violet-700 hover:underline">
            Voir tout
          </Link>
        </div>

        {tutoriels.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
            Aucun tutoriel publié pour l'instant.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {tutoriels.map((t) => (
              <TutorielsCard
                key={t.id}
                title={t.title}
                slug={t.slug}
                category={t.category}
                description={t.description}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
