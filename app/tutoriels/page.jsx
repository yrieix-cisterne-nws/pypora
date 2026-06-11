"use client";
import { useState } from "react";
import TutorielsCard from "../../components/tutorielsCard";

export default function Tutoriels() {
  return (
    <>
      {/* ── HEADER ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Apprenez à votre rythme</h1>
        <div>
          <h2 className="text-sm text-gray-500 max-w-lg font-normal">
            Liste des tutoriels disponibles. Maîtrisez les technologies les plus demandées
            grâce à nos cours structurés et accessibles.
          </h2>
        </div>
      </div>
      {/* ── CARDS ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <TutorielsCard title="Apprendre Python" slug="apprendre-python" category="Python" difficulty="Débutant" modules={12} description="Les bases du langage le plus populaire pour la data science et l'automatisation." author="Jean Dupont" />
          <TutorielsCard title="Maîtriser JavaScript" slug="maitriser-javascript" category="JavaScript" difficulty="Intermédiaire" modules={8} modulesLabel="modules restants" description="Approfondissez vos connaissances en JS moderne (ES6+), promesses et..." author="Sarah L." progress={40} />
          <TutorielsCard title="Développer avec React" slug="developper-react" category="React" difficulty="Avancé" modules={25} description="Créez des applications web performantes avec les Hooks, Context API et Next.js." author="Marc V." />
          <TutorielsCard title="Apprendre Python" slug="apprendre-python" category="Python" difficulty="Débutant" modules={12} description="Les bases du langage le plus populaire pour la data science et l'automatisation." author="Jean Dupont" />
          <TutorielsCard title="Maîtriser JavaScript" slug="maitriser-javascript" category="JavaScript" difficulty="Intermédiaire" modules={8} modulesLabel="modules restants" description="Approfondissez vos connaissances en JS moderne (ES6+), promesses et..." author="Sarah L." progress={40} />
          <TutorielsCard title="Développer avec React" slug="developper-react" category="React" difficulty="Avancé" modules={25} description="Créez des applications web performantes avec les Hooks, Context API et Next.js." author="Marc V." />
          <TutorielsCard title="Apprendre Python" slug="apprendre-python" category="Python" difficulty="Débutant" modules={12} description="Les bases du langage le plus populaire pour la data science et l'automatisation." author="Jean Dupont" />
          <TutorielsCard title="Maîtriser JavaScript" slug="maitriser-javascript" category="JavaScript" difficulty="Intermédiaire" modules={8} modulesLabel="modules restants" description="Approfondissez vos connaissances en JS moderne (ES6+), promesses et..." author="Sarah L." progress={40} />
          <TutorielsCard title="Développer avec React" slug="developper-react" category="React" difficulty="Avancé" modules={25} description="Créez des applications web performantes avec les Hooks, Context API et Next.js." author="Marc V." />
        </div>
      </div>
    </>
  );
}