export default function Tutoriel( {params} ) {
    return (
        <>
            <h1>{params.slug}</h1>
            <p>Contenu du tutoriel {params.slug}</p>
        </>
    )
}