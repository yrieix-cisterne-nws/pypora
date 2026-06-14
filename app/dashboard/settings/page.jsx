"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsDashboard() {
  const router = useRouter();

  const [username, setUsername]               = useState("");
  const [email, setEmail]                     = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const [saveLoading, setSaveLoading]         = useState(false);
  const [saveError, setSaveError]             = useState(null);
  const [saveSuccess, setSaveSuccess]         = useState(false);
  const [deleteLoading, setDeleteLoading]     = useState(false);
  const [loading, setLoading]                 = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((data) => {
        setUsername(data.username ?? "");
        setEmail(data.email ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error ?? "Erreur lors de la sauvegarde");
      } else {
        setSaveSuccess(true);
        setEditingUsername(false);
        router.refresh();
      }
    } finally {
      setSaveLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
    router.push("/login");
  }

  async function handleDeleteAccount() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) return;
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/user", { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        router.push("/");
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="flex-1 px-6 sm:px-10 py-8 max-w-5xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Paramètres du compte</h1>
      <p className="text-sm text-gray-500 mb-8">Gérez vos informations personnelles et la sécurité de votre compte.</p>

      <div className="flex gap-6 items-start">

        <div className="flex-1 min-w-0 flex flex-col gap-5">

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-6">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informations de profil
            </h2>

            {loading ? (
              <div className="h-24 flex items-center justify-center text-sm text-gray-400">Chargement…</div>
            ) : (
              <>
                <div className="mb-5">
                  <p className="text-sm text-gray-700 mb-2">Username</p>
                  <div className="flex items-center border border-gray-200 focus-within:border-violet-400 rounded-xl px-4 py-3 bg-white transition-colors">
                    {editingUsername ? (
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        autoFocus
                        className="flex-1 text-sm text-gray-900 outline-none"
                      />
                    ) : (
                      <p className="flex-1 text-sm text-gray-900">{username}</p>
                    )}
                    <button
                      onClick={() => setEditingUsername((v) => !v)}
                      className="text-violet-500 hover:text-violet-700 transition-colors ml-2"
                      aria-label="Modifier le nom d'utilisateur"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-700 mb-2">Email</p>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                    <p className="flex-1 text-sm text-gray-500">{email}</p>
                    <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400 italic mt-1.5">
                    Contactez le support pour modifier votre adresse email.
                  </p>
                </div>

                {saveError   && <p className="text-sm text-red-500 mb-3">{saveError}</p>}
                {saveSuccess && <p className="text-sm text-green-600 mb-3">Modifications enregistrées.</p>}

                <div className="border-t border-gray-100 pt-5 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saveLoading}
                    className="bg-violet-700 hover:bg-violet-800 disabled:opacity-60 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
                  >
                    {saveLoading ? "Enregistrement…" : "Enregistrer les modifications"}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Session
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Se déconnecter</p>
                <p className="text-xs text-gray-400 mt-0.5">Ferme votre session sur cet appareil.</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-violet-700 hover:text-violet-900 border border-violet-200 hover:border-violet-400 px-4 py-2 rounded-xl transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>

          <div className="bg-white border border-red-200 border-l-4 border-l-red-500 rounded-2xl p-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold text-red-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Zone de danger
              </h2>
              <p className="text-sm text-gray-600 max-w-sm">
                La suppression de votre compte est irréversible. Toutes vos données de progression seront définitivement effacées.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="text-sm font-semibold text-red-500 hover:text-red-700 disabled:opacity-60 transition-colors shrink-0 mt-1"
            >
              {deleteLoading ? "Suppression…" : "Supprimer le compte"}
            </button>
          </div>

        </div>

        <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-violet-800 uppercase tracking-wide mb-2">Aide & Support</p>
            <p className="text-sm text-violet-900 mb-3 leading-relaxed">
              Besoin d'aide ? Consultez notre documentation ou contactez le support.
            </p>
            <Link href="/tutoriels" className="text-sm text-violet-700 hover:text-violet-900 font-medium transition-colors">
              Voir les tutoriels →
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}
