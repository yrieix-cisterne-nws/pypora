import Link from "next/link";
import { getPayload } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ContinueCard from "@/components/dashboard/ContinueCard";
import CompletedCard from "@/components/dashboard/CompletedCard";

export default async function Dashboard() {
  const payload = await getPayload();
  const username = payload.username ?? payload.email ?? "là";

  const progressions = await prisma.progression.findMany({
    where: { user_id: payload.userId },
    include: { tutoriel: true },
    orderBy: { startedAt: "desc" },
  });

  const ongoing   = progressions.filter((p) => !p.completed);
  const completed = progressions.filter((p) => p.completed);

  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">

      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Bonjour, {username} !
          </h1>
          <p className="text-sm text-gray-500">
            {progressions.length === 0
              ? "Commencez votre premier tutoriel."
              : `${completed.length} tutoriel${completed.length > 1 ? "s" : ""} terminé${completed.length > 1 ? "s" : ""} · ${ongoing.length} en cours`}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 shrink-0 ml-4">
          {[40, 60, 45, 70, 55].map((h, i) => (
            <div key={i} className="w-2 rounded-full bg-violet-200" style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">En cours</h2>
          <Link href="/tutoriels" className="text-xs text-violet-700 hover:underline">Voir tout</Link>
        </div>
        {ongoing.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-3">Aucun tutoriel en cours.</p>
            <Link href="/tutoriels" className="text-xs font-semibold text-violet-700 hover:underline">
              Parcourir les tutoriels →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ongoing.map((p) => (
              <ContinueCard
                key={p.id}
                title={p.tutoriel.title}
                category={p.tutoriel.category}
                slug={p.tutoriel.slug}
                completed={false}
              />
            ))}
          </div>
        )}
      </section>

      {completed.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Terminés</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {completed.map((p) => (
              <CompletedCard
                key={p.id}
                title={p.tutoriel.title}
                category={p.tutoriel.category}
                slug={p.tutoriel.slug}
              />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
