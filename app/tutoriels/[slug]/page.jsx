"use client";
// Exemple de données — à remplacer par tes données réelles (API, props, etc.)
const tutorielData = {
  title: "Apprendre Python",
  category: "Python",
  difficulty: "Débutant",
  author: "Jean Dupont",
  description: "Les bases du langage le plus populaire pour la data science et l'automatisation.",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        { type: "text", value: "Python est un langage de programmation polyvalent créé par Guido van Rossum en 1991. Il est aujourd'hui l'un des langages les plus utilisés au monde grâce à sa syntaxe simple et lisible." },
        { type: "image", src: "/images/python-logo.png", alt: "Logo Python" },
        { type: "text", value: "Dans ce tutoriel, vous apprendrez les bases du langage Python, de l'installation jusqu'aux premières fonctions." },
      ],
    },
    {
      id: "installation",
      title: "Installation",
      content: [
        { type: "text", value: "Avant de commencer, vous devez installer Python sur votre machine. Rendez-vous sur le site officiel python.org et téléchargez la dernière version stable." },
        { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Guide d'installation de Python" },
        { type: "text", value: "Une fois installé, ouvrez un terminal et tapez `python --version` pour vérifier l'installation." },
      ],
    },
    {
      id: "variables",
      title: "Variables & Types",
      content: [
        { type: "text", value: "En Python, les variables sont déclarées dynamiquement. Il n'est pas nécessaire de spécifier le type. Python supporte plusieurs types natifs : int, float, str, bool, list, dict, tuple." },
        { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Variables et types en Python" },
      ],
    },
    {
      id: "fonctions",
      title: "Fonctions",
      content: [
        { type: "image", src: "/images/functions.png", alt: "Schéma d'une fonction" },
        { type: "text", value: "Une fonction en Python se déclare avec le mot-clé `def`. Elle peut accepter des paramètres et retourner une valeur avec `return`. Les fonctions permettent de réutiliser du code et d'organiser votre programme." },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: [
        { type: "text", value: "Félicitations ! Vous avez terminé ce tutoriel d'introduction à Python. Vous connaissez maintenant les bases du langage et êtes prêt à explorer des sujets plus avancés." },
        { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Récapitulatif et prochaines étapes" },
        { type: "text", value: "Pour aller plus loin, consultez nos tutoriels sur les structures de données, la programmation orientée objet, et les bibliothèques comme NumPy et Pandas." },
      ],
    },
  ],
};

// ── Blocs de contenu ──────────────────────────────────────────────────────────

function TextBlock({ value }) {
  return <p className="text-gray-700 text-sm leading-relaxed">{value}</p>;
}

function ImageBlock({ src, alt }) {
  return (
    <figure className="my-2">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl border border-gray-200 object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      {/* Fallback si image manquante */}
      <div
        className="w-full h-40 rounded-xl border border-dashed border-gray-300 bg-gray-50 items-center justify-center text-sm text-gray-400 hidden"
        aria-hidden="true"
      >
        {alt}
      </div>
    </figure>
  );
}

function VideoBlock({ url, caption }) {
  return (
    <figure className="my-2">
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-black" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title={caption}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-gray-400 text-center mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

function ContentBlock({ block }) {
  switch (block.type) {
    case "text":  return <TextBlock value={block.value} />;
    case "image": return <ImageBlock src={block.src} alt={block.alt} />;
    case "video": return <VideoBlock url={block.url} caption={block.caption} />;
    default:      return null;
  }
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Tutoriel({ params }) {
  const tuto = tutorielData; // remplace par ta récupération de données

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

      {/* ── En-tête du tutoriel ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-white bg-violet-700 px-2.5 py-0.5 rounded-full">
            {tuto.category}
          </span>
          <span className="text-xs text-gray-400">{tuto.difficulty}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{tuto.title}</h1>
        <p className="text-sm text-gray-500 mb-2">{tuto.description}</p>
        <p className="text-xs text-gray-400">Par {tuto.author}</p>
      </div>

      {/* ── Layout 2 colonnes ── */}
      <div className="flex gap-8 items-start">

        {/* ── Sidebar ── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="border border-gray-200 rounded-xl bg-white p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Sommaire
            </p>
            <nav className="flex flex-col gap-1">
              {tuto.sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="flex items-center gap-2.5 text-left text-sm text-gray-600 hover:text-violet-700 hover:bg-violet-50 px-2 py-1.5 rounded-lg transition-colors group"
                >
                  <span className="w-5 h-5 rounded-full border border-gray-200 group-hover:border-violet-400 flex items-center justify-center text-xs text-gray-400 group-hover:text-violet-600 shrink-0 transition-colors">
                    {i + 1}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Contenu principal ── */}
        <main className="flex-1 min-w-0">

          {/* Sommaire mobile (accordéon) */}
          <details className="md:hidden border border-gray-200 rounded-xl bg-white p-4 mb-6">
            <summary className="text-sm font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
              Sommaire
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <nav className="flex flex-col gap-1 mt-3">
              {tuto.sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="flex items-center gap-2.5 text-left text-sm text-gray-600 hover:text-violet-700 px-2 py-1.5 rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-400 shrink-0">
                    {i + 1}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          </details>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {tuto.sections.map((section) => (
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

        </main>
      </div>
    </div>
  );
}