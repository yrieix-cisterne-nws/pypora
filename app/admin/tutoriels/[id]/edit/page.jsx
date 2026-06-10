export default function EditTutoriel( {params} ) {
    return (
        <>
            <h1>Modifier le tutoriel {params.id}</h1>
            <form>
                <div>
                    <label htmlFor="title">Titre</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="category">Catégorie</label>
                    <input type="text" id="category" name="category" required />
                </div>
                <div>
                    <label htmlFor="difficulty">Difficulté</label>
                    <input type="text" id="difficulty" name="difficulty" required />
                </div>
                <div>
                    <label htmlFor="content">Contenu</label>
                    <textarea id="content" name="content" required></textarea>
                </div>
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </>
    )
}