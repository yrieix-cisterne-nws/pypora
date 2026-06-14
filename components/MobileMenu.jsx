"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({ isLoggedIn, username, email }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <Link href="/tutoriels" onClick={close}
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition-colors">
            Tutoriels
          </Link>
          <Link href="/communication" onClick={close}
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition-colors">
            Communication
          </Link>
          <div className="my-1 border-t border-gray-100" />
          {isLoggedIn ? (
            <Link href="/dashboard" onClick={close}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{username ?? email}</span>
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={close}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-violet-700 transition-colors">
                Login
              </Link>
              <div className="px-3 pt-1">
                <Link href="/register" onClick={close}
                  className="block text-center bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
