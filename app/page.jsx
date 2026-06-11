export default function Home() {
  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-8 py-10 md:py-14 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Apprenez à votre rythme</h1>
          <p className="text-sm mb-7">
            Découvrez une vaste collection de tutoriels couvrant divers sujets, allant de la programmation à la cuisine, en passant par le bricolage et bien plus encore. Que vous soyez débutant ou expert, notre plateforme offre des ressources adaptées à tous les niveaux.
          </p>
        </div>
        <div className="border rounded-lg overflow-hidden md:block">
          <img src="image_pc.avif" alt="Image de bienvenue" className="w-full h-60 object-cover" />
        </div>
      </div>
      <div className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 overflox-x-auto">
          <span className="text-xs font-semibold uppercase sm:inline">
          <h2>Catégories</h2>
          </span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 sm:py-10">
        <div className="mb-1">
          <h2>Tutoriels à la une</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
        </div>
      </div>
    </>
  );
}
