export default function Admin() {
    return (
        <>
            <h1>Admin Dashboard</h1>
            <div>
                <p>Gérer les tutoriels</p>
                <div>
                    <p>Titre</p>
                    <p>Catégorie</p>
                    <p>Difficulté</p>
                    <p>Publiés</p>
                    <p>Actions</p>
                </div>
            </div>
            <div>
                <a href="/admin/tutoriels/nouveau">Ajouter un tutoriel</a>
            </div>
        </>
    )
}