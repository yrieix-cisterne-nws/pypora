export default function Mentions() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Mentions légales</h1>
            <p className="text-sm text-gray-500 mb-6">
                Les informations suivantes sont fournies conformément aux exigences légales en matière de mentions légales pour le site web Pypora.
            </p>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">Éditeur du site :</span>
                    </p>
                    <p>
                        <span className="font-bold">Nom : </span>Yrieix Cisterne
                    </p>
                    <p>
                        <span className="font-bold">Status : </span>Etudiant en Bachelor Chefs de Projets Digitaux à la Normandie Web School
                    </p>
                    <p>
                        <span className="font-bold">Email : </span> ycisterne@normandiewebschool.fr
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">Hébergeur du site :</span>
                    </p>
                    <p>
                        <span className="font-bold">Nom de l'hébergeur : </span>OVH
                    </p>
                    <p>
                        <span className="font-bold">Adresse : </span>2 rue Kellermann, 59100 Roubaix, France
                    </p>
                    <p>
                        <span className="font-bold">Site : </span><a href="https://www.ovhcloud.com/fr/" className="text-blue-500">https://www.ovhcloud.com/fr/</a>
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">Nature du site :</span>
                    </p>
                    <p>
                        Ce site est un travail pédagogique sans objectifs commerciaux, réalisé dans le cadre d'un projet scolaire
                    </p> 
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">Propriété intellectuelle :</span>
                    </p>
                    <p>
                        Tout le contenu textes, vidéos et logos présents sur le site Pypora sont protégés par le droit d'auteur et sont la propriété exclusive de Pypora ou de ses partenaires. Toute reproduction, distribution ou utilisation non autorisée de ces contenus est strictement interdite
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">
                        <span className="font-bold">Données personnelles :</span>
                    </p>
                    <p>
                        <span className="font-bold">Collecte de données :</span> Le site Pypora collecte l'email et le nom d'utilisateur lors de l'inscription pour le bon fonctionnement du site. Ces données sont utilisées uniquement dans le cadre de l'utilisation du site et ne sont pas partagées avec des tiers
                    </p>
                    <p>
                        <span className="font-bold">Durée de conservation :</span> Les données personnelles sont conservées jusqu'à la suppresion du compte par l'utilisateur. Après suppression, les données sont définitivement effacées. L'utilisateur à aussi accès aux données depuis l'espace de gestion de son compte
                    </p>
                    <p>
                        <span className="font-bold">Cookies : </span> Le site Pypora n'utilise pas de cookies pour récolter des informations personnelles. Les cookies utilisés sont uniquement nécessaires au bon fonctionnement du site
                    </p>
                </div>
            </div>
        </div>
    )
}