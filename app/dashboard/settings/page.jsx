"use client";
import { useState } from "react";

export default function Settingsdashboard() {
  const [username, setUsername] = useState("Yrieix");
  const [darkMode, setDarkMode] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);

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

      {/* ── Contenu ── */}
      <div className="flex-1 px-6 sm:px-10 py-8 max-w-5xl">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Paramètres du compte
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Gérez vos informations personnelles et les paramètres de sécurité.
        </p>

        <div className="flex gap-6 items-start">

          {/* ── Colonne principale ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Informations de profil */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-6">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Informations de profil
              </h2>

              {/* Username */}
              <div className="mb-5">
                <p className="text-sm text-gray-700 mb-2">Username</p>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
                  {editingUsername ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={() => setEditingUsername(false)}
                      autoFocus
                      className="flex-1 text-sm text-gray-900 outline-none"
                    />
                  ) : (
                    <p className="flex-1 text-sm text-gray-900">{username}</p>
                  )}
                  <button
                    onClick={() => setEditingUsername(true)}
                    className="text-violet-500 hover:text-violet-700 transition-colors ml-2"
                    aria-label="Modifier le nom d'utilisateur"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">Email</p>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-white">
                  <p className="flex-1 text-sm text-gray-900">yrieix@tutohub.edu</p>
                  <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 italic mt-1.5">
                  Contactez le support pour modifier votre adresse email.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5 flex justify-end">
                <button className="bg-violet-700 hover:bg-violet-800 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-xl">
                  Enregistrer les modifications
                </button>
              </div>
            </div>

            {/* Préférences d'affichage */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-6">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Préférences d'affichage
              </h2>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Mode Sombre</p>
                  <p className="text-xs text-gray-400 mt-0.5">Basculer entre le thème clair et sombre.</p>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? "bg-violet-600" : "bg-gray-200"}`}
                  aria-label="Activer le mode sombre"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>

            {/* Zone de danger */}
            <div className="bg-white border border-red-200 border-l-4 border-l-red-500 rounded-2xl p-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-base font-semibold text-red-600 mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Zone de danger
                </h2>
                <p className="text-sm text-gray-600 max-w-sm">
                  La suppression de votre compte est irréversible. Toutes vos données de progression, certificats et accès aux tutoriels seront définitivement effacés.
                </p>
              </div>
              <button className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors shrink-0 mt-1">
                Supprimer le compte
              </button>
            </div>

          </div>

          {/* ── Colonne droite ── */}
          <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">

            {/* Aide & support */}
            <div className="bg-violet-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-violet-800 uppercase tracking-wide mb-2">
                Aide & Support
              </p>
              <p className="text-sm text-violet-900 mb-3 leading-relaxed">
                Besoin d'aide avec vos paramètres ? Notre équipe est là pour vous accompagner.
              </p>
              <a href="#" className="text-sm text-violet-700 hover:text-violet-900 font-medium transition-colors">
                Consulter la FAQ →
              </a>
            </div>

            {/* Carte progression */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-amber-50 to-gray-100 flex items-center justify-center">
                <span className="text-4xl opacity-30">💻</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 leading-snug">
                  Continuez votre progression. 85% de vos cours sont complétés cette semaine !
                </p>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}