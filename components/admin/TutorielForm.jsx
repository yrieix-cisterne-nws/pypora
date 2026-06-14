"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function newSection() {
  return { id: crypto.randomUUID(), title: "", content: [{ type: "text", value: "" }] };
}

function newBlock(type) {
  if (type === "image") return { type, src: "", alt: "" };
  if (type === "video") return { type, url: "", caption: "" };
  return { type: "text", value: "" };
}

export default function TutorielForm({ initialData }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle]         = useState(initialData?.title ?? "");
  const [slug, setSlug]           = useState(initialData?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory]   = useState(initialData?.category ?? "");
  const [imageurl, setImageurl]   = useState(initialData?.imageurl ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [sections, setSections]   = useState(() => {
    try { return initialData?.contenu ? JSON.parse(initialData.contenu) : [newSection()]; }
    catch { return [newSection()]; }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title));
  }, [title, slugManual]);

  // ── Sections ──
  function addSection() {
    setSections(s => [...s, newSection()]);
  }
  function removeSection(i) {
    setSections(s => s.filter((_, idx) => idx !== i));
  }
  function updateSectionTitle(i, val) {
    setSections(s => s.map((sec, idx) => idx === i ? { ...sec, title: val } : sec));
  }
  function addBlock(sectionIdx, type) {
    setSections(s => s.map((sec, idx) =>
      idx === sectionIdx ? { ...sec, content: [...sec.content, newBlock(type)] } : sec
    ));
  }
  function removeBlock(sectionIdx, blockIdx) {
    setSections(s => s.map((sec, idx) =>
      idx === sectionIdx
        ? { ...sec, content: sec.content.filter((_, bi) => bi !== blockIdx) }
        : sec
    ));
  }
  function updateBlock(sectionIdx, blockIdx, field, val) {
    setSections(s => s.map((sec, idx) =>
      idx === sectionIdx
        ? { ...sec, content: sec.content.map((b, bi) => bi === blockIdx ? { ...b, [field]: val } : b) }
        : sec
    ));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = {
        title, slug, description, category, imageurl, published,
        contenu: JSON.stringify(sections),
      };
      const url    = isEdit ? `/api/tutoriels/${initialData.id}` : "/api/tutoriels";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erreur"); return; }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-500 transition-colors bg-white";

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Admin</Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Modifier le tutoriel" : "Nouveau tutoriel"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
          )}

          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Informations</h2>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Titre</label>
              <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} required placeholder="Apprendre Python" />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Slug</label>
              <input
                className={inputCls}
                value={slug}
                onChange={e => { setSlugManual(true); setSlug(e.target.value); }}
                required
                placeholder="apprendre-python"
              />
              <p className="text-xs text-gray-400 mt-1">Auto-généré depuis le titre. Modifiable manuellement.</p>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Description</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                placeholder="Une courte description du tutoriel…"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1.5">Catégorie</label>
                <select
                  className={inputCls}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value="">Choisir…</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-700 mb-1.5">URL de l'image</label>
                <input className={inputCls} value={imageurl} onChange={e => setImageurl(e.target.value)} required placeholder="https://…" />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setPublished(p => !p)}
                className={`relative w-10 h-5 rounded-full transition-colors ${published ? "bg-violet-600" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${published ? "translate-x-5" : "translate-x-0"}`} />
              </button>
              <span className="text-sm text-gray-700">{published ? "Publié" : "Brouillon"}</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contenu</h2>
              <button
                type="button"
                onClick={addSection}
                className="text-xs font-semibold text-violet-700 hover:text-violet-900 border border-violet-200 hover:border-violet-400 px-3 py-1.5 rounded-lg transition-colors"
              >
                + Section
              </button>
            </div>

            {sections.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">Aucune section. Cliquez sur "+ Section" pour commencer.</p>
            )}

            {sections.map((section, si) => (
              <div key={section.id} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 w-5 text-center">{si + 1}</span>
                  <input
                    className={`${inputCls} flex-1`}
                    value={section.title}
                    onChange={e => updateSectionTitle(si, e.target.value)}
                    placeholder="Titre de la section"
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(si)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                    aria-label="Supprimer la section"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {section.content.map((block, bi) => (
                  <div key={bi} className="flex gap-2 items-start pl-7">
                    <div className="flex-1 flex flex-col gap-1.5">
                      {block.type === "text" && (
                        <textarea
                          className={`${inputCls} resize-none`}
                          rows={3}
                          value={block.value}
                          onChange={e => updateBlock(si, bi, "value", e.target.value)}
                          placeholder="Texte…"
                        />
                      )}
                      {block.type === "image" && (
                        <div className="flex gap-2">
                          <input className={inputCls} value={block.src} onChange={e => updateBlock(si, bi, "src", e.target.value)} placeholder="URL de l'image" />
                          <input className={`${inputCls} w-40`} value={block.alt} onChange={e => updateBlock(si, bi, "alt", e.target.value)} placeholder="Texte alt" />
                        </div>
                      )}
                      {block.type === "video" && (
                        <div className="flex gap-2">
                          <input className={inputCls} value={block.url} onChange={e => updateBlock(si, bi, "url", e.target.value)} placeholder="URL embed YouTube" />
                          <input className={`${inputCls} w-40`} value={block.caption} onChange={e => updateBlock(si, bi, "caption", e.target.value)} placeholder="Légende" />
                        </div>
                      )}
                      <span className="text-xs text-gray-400 capitalize">{block.type}</span>
                    </div>
                    <button type="button" onClick={() => removeBlock(si, bi)} className="text-gray-300 hover:text-red-400 transition-colors mt-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 pl-7">
                  {["text", "image", "video"].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addBlock(si, type)}
                      className="text-xs text-gray-400 hover:text-violet-600 border border-gray-200 hover:border-violet-300 px-2.5 py-1 rounded-lg transition-colors capitalize"
                    >
                      + {type}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Annuler</Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-violet-700 hover:bg-violet-800 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
            >
              {loading ? "Enregistrement…" : isEdit ? "Enregistrer" : "Créer le tutoriel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
