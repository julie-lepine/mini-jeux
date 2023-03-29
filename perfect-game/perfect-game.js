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
const nbCardsParam = 5
const scoreModal = document.getElementById("nbToursGagnesModal");

let nbToursGagnes = 0
let classCardToFind = ""

document.getElementById('newGameBtn').addEventListener('click', newGame)

function newGame() {
    nbToursGagnes = 0
    newTour()
}

function newTour() {
    nbToursGagnesSpan.innerText = nbToursGagnes
    scoreModal.innerText = nbToursGagnes
    plateau.innerHTML = ""
    elementToFindDiv.innerHTML = ""

    generateCards(nbCardsParam)

    // je récupère les cartes affichées et en récupère une au hasard
    let nbCardToFind = Utils.getRandomInt(nbCardsParam)
    let cardsPlateau = plateau.querySelectorAll('.perso')
    classCardToFind = cardsPlateau[nbCardToFind].classList

    let cptSeconds = 6

    let compteARebours = setInterval(() => {
        cptSeconds--
        elementToFindDiv.innerHTML = cptSeconds
        if(cptSeconds == 0) {
            clearInterval(compteARebours)
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
                            openModal()
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
            elementToFindDiv.innerHTML = ""
            elementToFindDiv.appendChild(newCardToFind)    
        }
    }, 1000)
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

// MODAL
const modal = document.getElementById("myModal");
const restartBtn = document.getElementById("restartBtn");
const span = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

restartBtn.addEventListener('click', function() {
    modal.style.display = "none";
    newGame()
})