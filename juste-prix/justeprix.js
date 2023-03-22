import { Confetti } from "../lib/confetti/confetti.js";

let numberToFind = 0
const resultDiv = document.getElementById('resultDiv')
const reboursDiv = document.getElementById('compteARebours')
let tempsRestant = 0
let compteurInterval = null
const gamePropalDiv = document.getElementById('gamePropalDiv')

// essai pour afficher dans le html le chiffre max 
//document.getElementById('lastInt').innerHTML = parseInt(tempsRestant)

// lancer le jeu au clic
document.getElementById('beginGame').addEventListener('click', function () {
    launchGame()
})

// Générer chiffre aléatoire : 
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

document.getElementById('checkPropalButton').addEventListener('click', function () {
    checkPropal()
})

// permet de vérifier l'input quand l'utilisateur appuie sur entrée
document.getElementById('userPropalInput').addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        checkPropal()
    }
})

// vérifier que la propal de l'utilisateur est bonne et réagir 
function checkPropal() {
    // le numberPropal sera la valeur entrée dans le userPropalInput
    let numberPropal = document.getElementById('userPropalInput').value
    if (numberToFind > numberPropal) {
        resultDiv.innerHTML = "C'est plus !"
        let audio = new Audio('./audio/plus.mp3')
        audio.play()
    } else if (numberToFind < numberPropal) {
        resultDiv.innerHTML = "C'est moins !"
        let audio = new Audio('./audio/moins.mp3')
        audio.play()
    } else if (numberToFind == numberPropal) {
        resultDiv.innerHTML = "C'est gagné !"
        endGame(true)
        //document.getElementById('beginGame').style.display = "block"
    }
}

// lancer la partie
function launchGame() {
    Confetti.stopAnimationConfetti()
    // récupérer chiffre alétoire
    numberToFind = getRandomInt(50)
    // essai pour afficher dans le html le chiffre max 
    //console.log(numberToFind.splice(1)); le pb de ça est que ça risque de changer la valeur de numberToFind
    tempsRestant = 20
    gamePropalDiv.style.display = "block"
    if (compteurInterval != null) {
        clearInterval(compteurInterval)
    }
    compteurInterval = setInterval(() => {
        reboursDiv.innerText = tempsRestant + ' seconde(s)'
        tempsRestant--
        if (tempsRestant >= 20) {
            reboursDiv.classList.add('ok')
        } else if (tempsRestant >= 10) {
            reboursDiv.classList.remove('ok')
            reboursDiv.classList.add('warning')
        } else if (tempsRestant >= 0) {
            // alerte si le temps est inférieur à 10s
            reboursDiv.classList.remove('warning')
            reboursDiv.classList.add('danger')
        } else if (tempsRestant < 0) {
            clearInterval(compteurInterval)
            // partie terminée
            endGame(false)
        }
    }, 1000);
    //beginGame.style.display = "none"
    
}

// fonction pour gérer la fin du jeu
function endGame (gagne) {
    if (gagne) {
        let audio = new Audio('./audio/win.wav')
        audio.play()
        Confetti.launchAnimationConfetti();
        setTimeout(() => {
            Confetti.stopAnimationConfetti()
        }, 5000)
    } else {
        let audio = new Audio('./audio/loose.wav')
        audio.play()
    }
    gamePropalDiv.style.display = "none"
    clearInterval(compteurInterval)
}

