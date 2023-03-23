/* TODO :
X Lancer un minuteur de x minutes au lancement de la partie 
X Générer un calcul (de deux chiffres aléatoires et opérateurs en aléatoire)
X Laisser l'utilisateur donner des propal

V2
X Paramétrer ma partie : temps du compte à rebours, opérateurs de la partie
*/

const reboursDiv = document.getElementById('minuteur')
const calculDiv = document.getElementById('calcul')
const propalInput = document.getElementById('propal')
const messengerDiv = document.getElementById('messenger')
const allShowPlayingDiv = document.querySelectorAll('.showPlayingDiv')
const nbSecondsGameInput = document.getElementById('nbSecondsGame')
const maxNumberCalcInput = document.getElementById('maxNumberCalc')

let tempsMinuteurBase = 10 // paramétrable
let maxCalculNumber = 20 // paramétrable
let tempsRestant = 0 
let compteurInterval = null
let currentCalcul = null
let cptGoodAnswers = 0
let cptBadAnswers = 0
let allCalculRecap = ''

function launchGame() {
    if(nbSecondsGameInput.value != undefined) {
        tempsMinuteurBase = nbSecondsGameInput.value
    }
    if(maxNumberCalcInput.value != undefined) {
        maxCalculNumber = maxNumberCalcInput.value
    }
    showPlayDiv(true)
    messengerDiv.innerHTML = ""
    clearInterval(compteurInterval)
    launchTimer(tempsMinuteurBase)
    generateCalcul()
    cptBadAnswers = 0
    cptGoodAnswers = 0
    propalInput.value = ""
    allCalculRecap = ""
}

// fonction qui va créer des calculs aléatoires
function generateCalcul() {
    currentCalcul = new Calcul(maxCalculNumber)
    calculDiv.innerText = currentCalcul.showCalcul
}

// comparer la réponse de l'utilisateur avec la vraie réponse
document.getElementById('validPropal').addEventListener('click', function () {
    checkInputValue()
})

function checkInputValue() {
    if (propalInput.value == currentCalcul.result) {
        /*let audio = new Audio('../pendu/audio/win.mp3')
        audio.play()*/
        messengerDiv.innerText = 'Bravo'
        cptGoodAnswers++
        allCalculRecap += `${currentCalcul.showCalculWithResult} | <span class="goodAnswer">${propalInput.value}</span> <br/>`
    } else {
        /*let audio = new Audio('../pendu/audio/error.mp3')
        audio.play()*/
        messengerDiv.innerText = `Oupsiiii, la bonne réponse était ${currentCalcul.showCalculWithResult}`
        allCalculRecap += `${currentCalcul.showCalculWithResult} | <span class="badAnswer">${propalInput.value}</span> <br/>`
        cptBadAnswers++
    }
    generateCalcul()
    propalInput.value = ""
}

// permet de vérifier l'input quand l'utilisateur appuie sur entrée
propalInput.addEventListener('keyup', e => {
    if (e.key == "Enter") {
        checkInputValue()
    }
})

// fonction de minuteur
function launchTimer(tempsMinuteurBase) {
    tempsRestant = tempsMinuteurBase
    reboursDiv.innerText = tempsRestant + ' seconde(s)'

    compteurInterval = setInterval(() => {
        // le code s'exécute toutes les 1s tant qu'on ne clear pas l'intervalle
        tempsRestant--
        reboursDiv.innerText = tempsRestant + ' seconde(s)'
        if (tempsRestant == 0) {
            clearInterval(compteurInterval)
            showPlayDiv(false)
            messengerDiv.innerHTML = `<br/> Bonne(s) réponse(s) : ${cptGoodAnswers} <br/>`
            messengerDiv.innerHTML += `Mauvaise(s) réponse(s) : ${cptBadAnswers} <br/><br/>`

            let totalQuestions = cptBadAnswers + cptGoodAnswers
            if(totalQuestions < 10) {
                totalQuestions = 10
            }
            let percentageGoodAnswers = 100 * cptGoodAnswers / totalQuestions
            messengerDiv.innerHTML += `Ratio : ${percentageGoodAnswers}% <br/>`
            messengerDiv.innerHTML += `% de réussite : ${cptGoodAnswers/((cptGoodAnswers + cptBadAnswers))*100}% <br/><br/>`
            
            messengerDiv.innerHTML += allCalculRecap

        }
    }, 1000);
}

// fonction pour masquer les éléments relatifs au jeu avant de cliquer sur le bouton GO
// et du coup ça sera un booléan, il faudra mettre truc ou false dans l'argument de la fonction
function showPlayDiv(show) {
    let displayProperty = "none"
    if (show) {
        displayProperty = "block"
    }
    allShowPlayingDiv.forEach(element => {
        element.style.display = displayProperty
    })
}

class Calcul {
    #operators = ['*', '-', '+']
    number1
    number2
    operator
    constructor(maximum) {
        this.number1 = this.#getRandomInt(maximum)
        this.number2 = this.#getRandomInt(maximum)
        // un operateur aléatoire dans operators[]
        this.operator = this.#operators[this.#getRandomInt(3)]
    }

    get result() {
        if (this.operator == '-') {
            return this.number1 - this.number2
        } else if (this.operator == '+') {
            return this.number1 + this.number2
        } else if (this.operator == '*') {
            return this.number1 * this.number2
        }
    }

    get showCalcul() {
        return `${this.number1} ${this.operator} ${this.number2}`
    }

    get showCalculWithResult() {
        return `${this.showCalcul} = ${this.result}`
    }

    // le # en fait une fonction privée qui ne pourra être appelée que dans cette fonction
    // on utilise la méthode en construisant l'objet mais il n'en aura pas besoin après
    // on indique "max" et non un chiffre car tous les this n'ont pas le même max
    #getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }
}

