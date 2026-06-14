export default function CommunicationPage() {
    return(
        <>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold mb-4">Communication</h1>
            </div>
            <a href="/reseau_social.zip" download="reseau_social.zip" className="flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl transition-colors shrink-0">
                Télécharger le livrable du réseau social
            </a>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <img src="/publication_courte.png" alt="Publication courte" className="w-96 rounded-lg" />
            </div>
            <div>
                <img src="/publication_longue.png" alt="Publication longue" className="w-96 rounded-lg" />
            </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <img src="/publication_visuelle.png" alt="Publication visuelle" className="w-96 rounded-lg" />
            </div>
            <div>
                <img src="/publication_video.png" alt="Publication vidéo" className="w-96 rounded-lg" />
            </div>
        </div>
        </>
    )
}