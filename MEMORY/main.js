// déclarer un tableau de toutes les cartes et créer de l'aléatoire pour les placer 

let jeuTableau;
let cptClickCurrent = 0
let cardClickedId
// variables pour déterminer un tableau initial des cartes puis un vide pour placer aléatoirement les cartes dedans :
const cards = ['mickey', 'donald', 'dingo', 'picsou', 'daisy', 'minnie', 'zaza', 'miss-tick']
const gameBoard = document.getElementById('gameBoard')

// compteur
let nbPairesOnGame
let cptCartesTrouvees = 0

// meilleurs scores
const nbCoupsCurrentNode = document.getElementById("nbCoupsCurrent");
const BestScoreNode = document.getElementById("BestScore");
const avgScoreNode = document.getElementById("avgScore");
const BestScoreCookie = "BestScore";
const AllScoresCookie = "AllScores"

let nbCoups = 0;

BestScoreNode.innerText = getCookie(BestScoreCookie)
avgScoreNode.innerText = getAverageNbCoups();

// bouton pour récupérer le nb de paires voulues pour jouer + initialisation de la fonction initGame
document.getElementById('playButton').addEventListener("click", function () {
    let nbCardInput = document.getElementById('nbCardInput')
    initGame(nbCardInput.value)
})

// boutons + et - de cartes
document.querySelector('#moreCards').addEventListener('click', function () {
    let nbCardInput = document.getElementById('nbCardInput')
    if (nbCardInput.value < 8) {
        nbCardInput.value++
    }
})

document.querySelector('#lessCards').addEventListener('click', function () {
    let nbCardInput = document.getElementById('nbCardInput')
    if (nbCardInput.value > 2) {
        nbCardInput.value--
    }
})

// fonction qui gère le clic sur une carte : 
function clickOnCardEvent(card) {
    let allCards = document.querySelectorAll('.card')
    // vérifier qu'on a pas déjà retourné sur la carte et si oui, ne fait rien (return)
    if (card.classList.contains('finded')) {
        return;
    }
    cptClickCurrent++
    if (cptClickCurrent == 1) {
        // 1er click, je cache les images trouvées avant
        allCards.forEach(card => {
            if (card.classList.contains("finded")) {
                // c'est une carte trouvée
            } else {
                // carte pas trouvée, il faut qu'elle soit masquée
                card.classList.add("hidden")
            }
        })
        // j'affiche la carte sur laquelle je viens de cliquer en suppprimant sa classe hidden
        card.classList.remove("hidden")
        // je stocke la réponse derrière la carte et je la retourne
        cardClickedId = card.id
    }
    else if (cptClickCurrent == 2) {
        // 2è click, je vérifie si l'image a été trouvée
        if (cardClickedId == card.id) {
            cptClickCurrent = 1
            return
        } else {
            card.classList.remove("hidden")
            let cardClickedBefore = document.getElementById(cardClickedId)
            if (cardClickedBefore.dataset.image == card.dataset.image) {
                allCards.forEach(card => {
                    if (card.classList.contains("hidden")) {
                        // c'est une carte cachée, on ne fait rien
                    }
                    else if (!card.classList.contains("finded")) {
                        card.classList.add("finded")
                        cptCartesTrouvees++
                    }
                })
            }

            nbCoups++
            nbCoupsCurrentNode.innerText = nbCoups;

            cptClickCurrent = 0
            // on oublie les cartes précédemment retournées car on ne les recherchera pas une nouvelle fois au tour d'après :
            cardClickedId = ""

            if (cptCartesTrouvees == nbPairesOnGame * 2) {
                // animation pour la win
                setAnimationWin()
                let audio = new Audio("./sounds/magic-shime.mp3")
                audio.play()
                let oldScore = getCookie(AllScoresCookie);
                let allscore = "";
                if (oldScore != null) {
                    allscore = oldScore + "." + nbCoups;
                }
                else {
                    allscore = nbCoups;
                }

                setCookie(AllScoresCookie, allscore);
                avgScoreNode.innerText = getAverageNbCoups();

                if (nbCoups < getCookie(BestScoreCookie)
                    || getCookie(BestScoreCookie) == null) {
                    // On a battu le meilleur score !
                    let audio2 = new Audio("./sounds/applause.mp3")
                    audio2.play()
                    // va faire fonctionner le second audio mais stoppera le premier afin qu'ils ne se chevauchent pas en cas de meilleur score (car aussi partie gagnée) :
                    audio.pause()
                    setCookie(BestScoreCookie, nbCoups);
                    BestScoreNode.innerText = nbCoups;
                }
                 /* on aurait aussi pu mettre le son de victoire classique comme ça :
                 else {
                    // on a pas battu le meilleur score mais on a gagné
                    let audio = new Audio("./sounds/magic-shime.mp3")
                    audio.play()
                }*/
            }
        }
    }
}

// placement aléatoire des cartes au démarrage de partie
function initGame(nbPaires) {
    stopAnimation()
    // le plateau se vide quand on commence une partie plutôt que d'ajouter les cartes à la suite des anciennes déjà jouées
    gameBoard.innerHTML = ""
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0
    nbCoups = 0;
    nbCoupsCurrentNode.innerText = nbCoups;
    let gameCards = [];
    for (let i = 0; i < nbPaires; i++) {
        // 2 fois gameCards car chaque carte va par paire
        gameCards.push([cards[i], false])
        gameCards.push([cards[i], false])
    }

    console.log(gameCards);

    for (let i = 0; i < gameCards.length; i++) {
        let cardIsPositionned = false
        while (!cardIsPositionned) {
            // génération du chiffre aléatoire pour chaque carte
            let randomNumber = getRandomArbitrary(0, gameCards.length)
            if (gameCards[randomNumber][1] == false) {
                cardIsPositionned = true
                gameCards[randomNumber][1] = true
                // positionner la carte dans le html
                let cardHtml = getHtmlCodeCard(gameCards[randomNumber][0], i);
                gameBoard.innerHTML += cardHtml
                // générer le code html et l'inclure
            }
        }
    }
    // ajout de l'événement de clic sur toutes les cartes, permet de les masquer et démasquer
    let allCards = document.querySelectorAll('.card')
    allCards.forEach(card => {
        card.addEventListener("click", function () {
            clickOnCardEvent(card)
        })
    })
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getHtmlCodeCard(nomCard, id) {
    return ` <div class ="card hidden" id="${id}" data-image="${nomCard}"> <img src="./img/${nomCard}.bmp"> </div> `
}

// gestion des confettis
function setAnimationWin() {
    let animateDiv = document.getElementById('allConfettis')
    animateDiv.innerHTML = ""
    for (let i = 0; i < 100; i++) {
        // on crée 100 confettis auxquels on ajoute la classe confetti déjà stylisée en CSS
        let confetti = document.createElement("div")
        confetti.classList.add('confetti')
        confetti.style.left = getRandomArbitrary(0, 100) + '%'
        // animations différentes pour chaque confetti
        confetti.style.animationDelay = 50 * i + "ms"
        // couleur aléaoire
        confetti.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
        animateDiv.appendChild(confetti)
    }
}

function stopAnimation() {
    let animateDiv = document.getElementById('allConfettis')
    animateDiv.innerHTML = ""
}

// fonction pour récupérer les cookies
function setCookie(name, value) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);
    /* Sets the max-age attribute so that the cookie expires
    after the specified number of days */
    cookie += "; max-age=" + (100 * 24 * 60 * 60);
    document.cookie = cookie;
}

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        // Supprime l'espace au début du nom du cookie et le compare avec la chaine de caractères donnée 
        if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

function getAverageNbCoups() {
    let allscore = getCookie(AllScoresCookie);
    if (allscore != null) {
        let allScoreTab = allscore.split(".");
        let sum = 0;
        let nbParties = 0;
        allScoreTab.forEach(score => {
            // sum vaut lui-même plus le score
            // transformer le score en entier sinon ça reste en chaine de caractère et donc ajoute les nbCoups les uns après les autres. Utiliser + ou parseInt()
            sum += +score;
            nbParties++;
        });

        let moyenne = sum / nbParties;
        return Math.round(moyenne);
    }
    else {
        return 0;
    }
}