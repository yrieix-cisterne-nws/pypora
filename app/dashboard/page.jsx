import Link from "next/link";

const user = {
  name: "Yrieix",
};

const continueTutorials = [
  {
    slug: "maitriser-react-tailwind",
    title: "Maîtriser React & Tailwind...",
    author: "Thomas Legrand",
    lessons: { done: 10, total: 24 },
    progress: 30,
    category: "Dev",
    imgBg: "from-violet-950 to-pink-900",
  },
  {
    slug: "fondamentaux-ux",
    title: "Les fondamentaux de l'UX...",
    author: "Sarah Jenkins",
    lessons: { done: 8, total: 20 },
    progress: 46,
    category: "Design",
    imgBg: "from-slate-800 to-blue-900",
  },
  {
    slug: "data-analysis-python",
    title: "Data Analysis avec Python",
    author: "Alan Turing",
    lessons: { done: 18, total: 22 },
    progress: 82,
    category: "Dev",
    imgBg: "from-slate-900 to-violet-950",
  },
    {
    slug: "data-analysis-python",
    title: "Data Analysis avec Python",
    author: "Alan Turing",
    lessons: { done: 18, total: 22 },
    progress: 82,
    category: "Dev",
    imgBg: "from-slate-900 to-violet-950",
  },
];

const certificates = [
  {
    title: "Advanced JS",
    date: "Obtenu le 12 Mars 2024",
    obtained: true,
  },
  {
    title: "Product Design",
    date: "Obtenu le 24 Janv. 2024",
    obtained: true,
  },
  {
    title: "Passer un examen",
    date: null,
    obtained: true,
  },
    {
    title: "Passer un examen",
    date: null,
    obtained: true,
  },
];

function ContinueCard({ title, author, lessons, progress, category, imgBg, slug }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
      <div className={`relative h-28 bg-linear-to-br ${imgBg} flex items-center justify-center`}>
        <span className="absolute top-2 left-2 text-xs font-semibold text-white bg-violet-700 px-2 py-0.5 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug truncate">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Par {author} • {lessons.done}/{lessons.total} leçons
          </p>
        </div>
        <div className="h-0.5 w-full bg-gray-100 rounded-full">
          <div
            className="h-0.5 rounded-full bg-violet-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{progress}% complété</span>
          <Link
            href={`/tutoriels/${slug}`}
            className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 transition-colors"
          >
            Reprendre
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ title, date, obtained }) {
  return (
    <div className={`border rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-colors ${
      obtained
        ? "bg-white border-gray-200"
        : "bg-gray-50 border-dashed border-gray-200 cursor-pointer hover:border-violet-400 hover:bg-violet-50"
    }`}>
      {obtained ? (
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      )}
      <div>
        <p className={`text-sm font-semibold ${obtained ? "text-gray-900" : "text-violet-600"}`}>
          {title}
        </p>
        {date && <p className="text-xs text-gray-400 mt-0.5">{date}</p>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
{/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-52 shrink-0 bg-white border-r border-gray-200 px-4 py-6">
        <div className="mb-8">
          <p className="text-violet-700 font-bold text-base">Admin Panel</p>
          <p className="text-xs text-gray-400">Management Suite</p>
        </div>
        <nav className="flex flex-col gap-1">
          <a
            href="/dashboard"
            className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-violet-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </a>
          <a
            href="/dashboard/settings"
            className="flex items-center gap-2.5 text-sm text-violet-700 font-semibold bg-violet-100 px-3 py-2 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Bonsoir, {user.name}
            </h1>
            <p className="text-sm text-gray-500">
              Vous avez fait d'excellents progrès cette semaine. Continuez comme ça !
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 shrink-0 ml-4">
            {[40, 60, 45, 70, 55].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-violet-200"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Continuez de regarder</h2>
            <Link href="/tutoriels" className="text-xs text-violet-700 hover:underline">Voir tout</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {continueTutorials.map((t) => (
              <ContinueCard key={t.slug} {...t} />
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Vos certificats</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {certificates.map((c, i) => (
              <CertificateCard key={i} {...c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
