/*
TO DO : 
X Générer un mot aléatoire
X Afficher le mot en masqué _ _ _ _ _ _ _ _ 

- Pouvoir proposer des lettres
- Afficher les lettres trouvées
- Gérer un nombre d'erreurs max
- Afficher des lettres visibles
*/

const btnPlay = document.getElementById('beginGame')
// liste de mots peut être remplacée par API qui recherche des mots (/!\ à faire en sorte de supprimer les accents):
const allWords = ['chaussette', 'robot', 'noeud', 'vertige', 'gravitation', 'mouchoir', 'crabe', 'transport', 'serpent', 'cruel', 'ventriloque', 'chevrotine', 'papillon', 'sensible', 'terreau', 'vache', 'montagne', 'ministre', 'congolais', 'vertical', 'corrompre']
const wordToFindDiv = document.getElementById('wordToFindDiv')
const keyboardDiv = document.getElementById('keyboard')
let wordToFind
let wordToFindArray

// lancer le jeu
btnPlay.addEventListener('click', function () {
    initGame()
})

function initGame() {
    wordToFindDiv.innerHTML = ''
    var randomWord = Math.floor(Math.random() * allWords.length)
    var wordToFind = allWords[randomWord]
    wordToFindArray = Array.from(wordToFind)
    
    // créer un tableau d'une ligne pour ensuite créer une lettre = une colonne (td)
    let table = document.createElement("table")
    let line = document.createElement("tr")

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
