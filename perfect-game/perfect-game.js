import { Utils } from "../lib/Utils/utils.js";

/*
* DEROULEMENT D'UN TOUR
X générer des cartes aléatoirement
- laisser les cartes visibles 5 secondes
- montrer la carte à trouver
- laisser trois secondes au joueur pour choisir son emplacement

Si gagné -> recommencer le tour
Si perdu -> fin de la partie

Sauvegarder le score en cookies

* TODO
- Générer des cartes 
*/

const plateau = document.getElementById('cardsPlateau')

generateCards(5)

// génération d'autant de cartes aléatoires que nbCards
function generateCards(nbCards) {
    for (let i = 0; i < nbCards; i++) {
        // je crée le div
        let newCard = document.createElement('div')
        newCard.classList.add('perso')
        // je génère un chiffre (carte) aléatoire sur le nb de cartes que j'ai en tout
        let nbPersoAlea = Utils.getRandomInt(24)
        newCard.classList.add("perso"+nbPersoAlea)

        // j'ajoute chaque card au plateau
        plateau.appendChild(newCard)
    }
}