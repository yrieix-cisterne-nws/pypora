"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminTutorielRow({ tutoriel }) {
  const router = useRouter();
  const [published, setPublished] = useState(tutoriel.published);
  const [deleting, setDeleting] = useState(false);

  async function togglePublish() {
    const res = await fetch(`/api/tutoriels/${tutoriel.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      setPublished(!published);
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm(`Supprimer "${tutoriel.title}" ? Cette action est irréversible.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/tutoriels/${tutoriel.id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else setDeleting(false);
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-900 font-medium overflow-hidden truncate">
        {tutoriel.title}
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        <span className="text-xs font-semibold text-white bg-violet-700 px-2.5 py-0.5 rounded-full">
          {tutoriel.category}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={togglePublish}
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
            published
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {published ? "Publié" : "Brouillon"}
        </button>
      </td>
      <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">
        {new Date(tutoriel.createdAt).toLocaleDateString("fr-FR")}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/tutoriels/${tutoriel.id}/edit`}
            className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
          >
            Modifier
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
          >
            {deleting ? "…" : "Supprimer"}
          </button>
        </div>
      </td>
    </tr>
  );
}
