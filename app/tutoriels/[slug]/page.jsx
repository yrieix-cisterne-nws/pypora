import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPayload } from "@/lib/auth";
import CompleteButton from "@/components/CompleteButton";
import ContentBlock from "@/components/tutoriel/ContentBlocks";

export default async function TutorielPage({ params }) {
  const { slug } = await params;

  const payload = await getPayload();
  if (!payload) redirect("/register");

  const tuto = await prisma.tutoriel.findFirst({
    where: { slug, published: true },
    include: { categorie: true },
  });

  if (!tuto) notFound();

  let sections = [];
  try {
    sections = JSON.parse(tuto.contenu);
  } catch {
    sections = [];
  }

  const progression = await prisma.progression.findFirst({
    where: { user_id: payload.userId, tutorial_id: tuto.id },
  });
  const initialCompleted = progression?.completed ?? false;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-white bg-violet-700 px-2.5 py-0.5 rounded-full">
            {tuto.category}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{tuto.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{tuto.description}</p>
      </div>

      <div className="flex gap-8 items-start">

        {sections.length > 0 && (
          <aside className="hidden md:block w-56 shrink-0">
            <div className="border border-gray-200 rounded-xl bg-white p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Sommaire
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((section, i) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-violet-700 hover:bg-violet-50 px-2 py-1.5 rounded-lg transition-colors group"
                  >
                    <span className="w-5 h-5 rounded-full border border-gray-200 group-hover:border-violet-400 flex items-center justify-center text-xs text-gray-400 group-hover:text-violet-600 shrink-0 transition-colors">
                      {i + 1}
                    </span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <main className="flex-1 min-w-0">

          {sections.length > 0 && (
            <details className="md:hidden border border-gray-200 rounded-xl bg-white p-4 mb-6">
              <summary className="text-sm font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
                Sommaire
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <nav className="flex flex-col gap-1 mt-3">
                {sections.map((section, i) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-violet-700 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-400 shrink-0">
                      {i + 1}
                    </span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </details>
          )}

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.content.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <CompleteButton tutorialId={tuto.id} initialCompleted={initialCompleted} />
          </div>

        </main>
      </div>
    </div>
  );
}
