export default function tutorielsCard({title, slug, category, difficulty}) {
    return (
        <div className="tuto-card">
            <h3>{title}</h3>
            <p>{category}, {difficulty}</p>
            <a href={`/tutoriels/${slug}`}>Voir le tutoriel</a>
        </div>
    );
}