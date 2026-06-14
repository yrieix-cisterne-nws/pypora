import { prisma } from "@/lib/prisma";
import TutorielsCard from "@/components/tutorielsCard";
import Link from "next/link";

export default async function Tutoriels({ searchParams }) {
  const { category: categorySlug } = await searchParams;

  const [categories, tutoriels] = await Promise.all([
    prisma.categorie.findMany({ orderBy: { name: "asc" } }),
    prisma.tutoriel.findMany({
      where: {
        published: true,
        ...(categorySlug ? { categorie: { slug: categorySlug } } : {}),
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Apprenez à votre rythme</h1>
        <p className="text-sm text-gray-500 max-w-lg">
          Liste des tutoriels disponibles. Maîtrisez les technologies les plus demandées
          grâce à nos cours structurés et accessibles.
        </p>
      </div>
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto flex items-center gap-2 px-4 sm:px-8 py-3 overflow-x-auto">
          <Link
            href="/tutoriels"
            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
              !categorySlug
                ? "bg-violet-700 text-white border-violet-700"
                : "text-violet-700 bg-violet-50 border-violet-200 hover:bg-violet-100"
            }`}
          >
            Tous
          </Link>
          {categories.map((cat) => {
            const isActive = cat.slug === categorySlug;
            return (
              <Link
                key={cat.id}
                href={`/tutoriels?category=${cat.slug}`}
                className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  isActive
                    ? "bg-violet-700 text-white border-violet-700"
                    : "text-violet-700 bg-violet-50 border-violet-200 hover:bg-violet-100"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {tutoriels.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
            Aucun tutoriel{categorySlug ? " dans cette catégorie" : ""} pour l'instant.
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
