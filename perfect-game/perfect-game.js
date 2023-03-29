import { Utils } from "../lib/Utils/utils.js";

/*
* DEROULEMENT D'UN TOUR
X générer des cartes aléatoirement
X laisser les cartes visibles 5 secondes puis les masquer
X montrer la carte à trouver
X laisser trois secondes au joueur pour choisir son emplacement

X Si gagné -> recommencer le tour
X Si perdu -> fin de la partie

Sauvegarder le score en cookies
*/

const plateau = document.getElementById('cardsPlateau')
const elementToFindDiv = document.getElementById('elementToFind')
const nbToursGagnesSpan = document.getElementById('nbToursGagnesSpan')
const perduDiv = document.getElementById('perdu')
const nbCardsParam = 5

let nbToursGagnes = 0
let classCardToFind = ""

document.getElementById('newGameBtn').addEventListener('click', newGame)

function newGame() {
    nbToursGagnes = 0
    newTour()
    perduDiv.style.display = "none"
}

function newTour() {
    nbToursGagnesSpan.innerText = nbToursGagnes
    plateau.innerHTML = ""
    elementToFindDiv.innerHTML = ""

    generateCards(nbCardsParam)

    // je récupère les cartes affichées et en récupère une au hasard
    let nbCardToFind = Utils.getRandomInt(nbCardsParam)
    let cardsPlateau = plateau.querySelectorAll('.perso')
    classCardToFind = cardsPlateau[nbCardToFind].classList

    // afficher x cartes pendant 5 secondes puis les remplacer par l'image "?"
    setTimeout(() => {
        let allCards = document.querySelectorAll('.perso')
        allCards.forEach(card => {
            card.classList.add('hidden')
            card.addEventListener('click', function clickOnCard() {
                if (card.classList.contains('hidden')) {
                    // je vérifie que cette carte corresponde à celle cliquée
                    // ici, on ajoute value car dans le cas de cartes jumelles, le code en choisira quand même un qui sera indépendant de l'autre
                    if (classCardToFind.value == card.classList) {
                        nbToursGagnes++
                        newTour()
                    } else {
                        perduDiv.style.display = "inline-block"
                        allCards.forEach(cardWhenLoose => {
                            cardWhenLoose.classList.remove('hidden')
                        })
                    }
                }
            })
        });

        // ajouter l'élément à trouver après le laps de temps alloué
        let newCardToFind = document.createElement('div')
        newCardToFind.classList = classCardToFind
        newCardToFind.classList.remove('hidden')
        elementToFindDiv.appendChild(newCardToFind)

    }, "5000");
}

// génération d'autant de cartes aléatoires que nbCardsParam
function generateCards(nbCardsParam) {
    for (let i = 0; i < nbCardsParam; i++) {
        // je crée le div
        let newCard = document.createElement('div')
        newCard.classList.add('perso')
        // je génère un chiffre (carte) aléatoire sur le nb de cartes que j'ai en tout
        let nbPersoAlea = Utils.getRandomInt(24)
        newCard.classList.add("perso" + nbPersoAlea)

        // j'ajoute chaque card au plateau
        plateau.appendChild(newCard)
    }
}