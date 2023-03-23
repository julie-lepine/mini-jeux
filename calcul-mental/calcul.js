/* TODO :
X Lancer un minuteur de x minutes au lancement de la partie 
X Générer un calcul (de deux chiffres aléatoires et opérateurs en aléatoire)
- Laisser l'utilisateur donner des propal

V2
- Paramétrer ma partie : temps du compte à rebours, opérateurs de la partie
*/

const reboursDiv = document.getElementById('minuteur')
const calculDiv = document.getElementById('calcul')
const tempsMinuteurBase = 5
const propalInput = document.getElementById('propal')
let tempsRestant = 0
let compteurInterval = null
let currentCalcul = null

function launchGame() {
    launchTimer(tempsMinuteurBase)
}

// fonction qui va créer des calculs aléatoires
function generateCalcul() {
    currentCalcul = new Calcul(500)
    calculDiv.innerText = currentCalcul.showCalcul
}

// comparer la réponse de l'utilisateur avec la vraie réponse
document.getElementById('validPropal').addEventListener('click', function() {
    if(propalInput.value == currentCalcul.result) {
        alert('bravo')
    } else {
        alert('no')
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
        }
    }, 1000);
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
        if(this.operator == '-') {
            return this.number1 - this.number2
        } else if(this.operator == '+') {
            return this.number1 + this.number2
        } else if(this.operator == '*') {
            return this.number1 * this.number2
        }
    }

    get showCalcul() {
        return `${this.number1} ${this.operator} ${this.number2}`
    }

// le # en fait une fonction privée qui ne pourra être appelée que dans cette fonction
// on utilise la méthode en construisant l'objet mais il n'en aura pas besoin après
// on indique "max" et non un chiffre car tous les this n'ont pas le même max
    #getRandomInt(max) {
        return Math.floor(Math.random() * max)
    }
}