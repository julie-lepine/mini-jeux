import { Confetti } from "../lib/confetti/confetti.js";

const btnPlay = document.getElementById('beginGame')
// liste de mots peut être remplacée par API qui recherche des mots (/!\ à faire en sorte de supprimer les accents):
const allWords = ['chaussette', 'robot', 'noeud', 'vertige', 'gravitation', 'mouchoir', 'crabe', 'transport', 'serpent', 'cruel', 'ventriloque', 'chevrotine', 'papillon', 'sensible', 'terreau', 'vache', 'montagne', 'ministre', 'congolais', 'vertical', 'corrompre']
const wordToFindDiv = document.getElementById('wordToFindDiv')
const keyboardDiv = document.getElementById('keyboard')
const cptErreursDiv = document.getElementById('cptErreurs')
let wordToFind
let wordToFindArray
const letter = document.getElementsByClassName('letterKeyboard')
let cptErreurs = 0
let cptFindedLetters = 0

// lancer le jeu
btnPlay.addEventListener('click', function () {
    initGame()
    cptErreurs = 0
})

function initGame() {
    Confetti.stopAnimationConfetti()
    wordToFindDiv.innerHTML = ''
    var randomWord = Math.floor(Math.random() * allWords.length)
    var wordToFind = allWords[randomWord]
    wordToFindArray = Array.from(wordToFind)
    
    console.log(wordToFind)

    // créer un tableau d'une ligne pour ensuite créer une lettre = une colonne (td)
    let table = document.createElement("table")
    let line = document.createElement("tr")
    line.id="lineOfWord"

    wordToFindArray.forEach(letter => {
        //Créer un TD (case du tableau) par lettre
        let td = document.createElement("td")
        td.dataset.letter = letter
        td.innerText = "_"
        line.appendChild(td)
    });

    table.appendChild(line)
    wordToFindDiv.appendChild(table)

    generateKeyboard()
}

function generateKeyboard() {
    keyboardDiv.innerHTML = ''
    let alphabet = generateAlphabet()
    alphabet.forEach(letter => {
        let letterDiv = document.createElement("div")
        letterDiv.innerHTML = letter
        letterDiv.classList.add('letterKeyboard')
        keyboardDiv.appendChild(letterDiv)

        letterDiv.addEventListener('click', () => {
            if (checkLetterInWord(letter)) {
                // afficher la lettre dans le mot masqué
                let lineOfWord = document.getElementById('lineOfWord')
                let allTd = lineOfWord.children

                Array.from(allTd).forEach(td => {
                    if(td.dataset.letter == letter) {
                        td.innerHTML = letter
                        let audio = new Audio('./audio/win.mp3')
                        audio.play()
                        cptFindedLetters++
                    }
                })
                if(cptFindedLetters == wordToFindArray.length) {
                    keyboardDiv.innerHTML = ''
                    cptErreursDiv.innerHTML = 'Vous avez gagné avec ' + cptErreurs + ' erreurs !'
                    endGame(true)
                    document.getElementById('imgPenduDiv').className = ''
                }
            } else {
                let audio = new Audio('./audio/error.mp3')
                audio.play()
                cptErreurs++
                cptErreursDiv.innerHTML = cptErreurs
                // ajout de l'image du pendu en fonction du nb d'erreurs
                let imgPendu = document.getElementById('imgPenduDiv')
                imgPendu.className = ''
                imgPendu.classList.add('etat'+cptErreurs)

                if(cptErreurs >= 6) {
                    // on a perdu
                    cptErreursDiv.innerHTML = "Perdu !"
                    // afficher le mot entier si perdu, on reprend la méthode de si gagné et on modifie le résultat (td.innerHTML = td.dataset.letter)
                    let lineOfWord = document.getElementById('lineOfWord')
                    let allTd = lineOfWord.children
                    Array.from(allTd).forEach(td => {
                            td.innerHTML = td.dataset.letter
                    })
                    // masque le keyboard si perdu
                    keyboardDiv.innerHTML = ''
                    endGame(false)
                }
            } 
        })
    })
}

// générer un clavier virtuel pour proposer des lettres
function generateAlphabet(capital = false) {
    // retourne un tableau de 26 caractères qui récupère depuis le charCode 26 (a) ou le 97 (A)
    // c'est le .map qui fait le .for
    return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)))

    /****** autre façon de faire, avec le for :
    let tab = []
    for (i = 65; i<65+26; i++) {
        if (capital) {
            tab.push(String.fromCharCode(i + 32))
        } else {
            tab.push(String.fromCharCode(i))
        }
        return tab
    }*/

}

// au clic sur la lettre du clavier, vérifier qu'elle est présente dans le mot
function checkLetterInWord(letter) {
    let findLetter = false
    wordToFindArray.forEach(letterOfWord => {
        if(letter == letterOfWord) {
            findLetter = true
        }
    }) 
    return findLetter
}

// fonction pour gérer la fin du jeu
function endGame (gagne) {
    if (gagne) {
        let audio = new Audio('./audio/yeah.mp3')
        audio.play()
        Confetti.launchAnimationConfetti();
        setTimeout(() => {
            Confetti.stopAnimationConfetti()
        }, 5000)
    } else {
        let audio = new Audio('./audio/loose.mp3')
        audio.play()
    }
}
