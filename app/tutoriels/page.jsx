import TutorielsCard from "../../components/tutorielsCard";

export default function Tutoriels() {
    return (
        <>
            <h1>Tutoriels</h1>
            <div>
                <h2>Liste des tutoriels disponibles</h2>
            </div>
            <div>
                <button> Tout les tutoriels </button>
                <button>Par catégories</button>
            </div>
            <div>
                <TutorielsCard title="Apprendre Python" slug="apprendre-python" category="Python" difficulty="Débutant" />
                <TutorielsCard title="Maîtriser JavaScript" slug="maitriser-javascript" category="JavaScript" difficulty="Intermédiaire" />
                <TutorielsCard title="Développer avec React" slug="developper-react" category="React" difficulty="Avancé" />
            </div>
        </>
    )
}