// Utils pour importer des fonctions que l'on utilisera tout le temps, ici le getRandomInt()
import { Utils } from "../lib/Utils/utils.js";
import { Confetti } from "../lib/confetti/confetti.js";

/* TODO 
- créer div html avec points et modifier la classe en fonction de si ok, ok pas bonne place
*/

const colors = ["purple", "white", "grey", "pink"]
const nbColorToFind = 4
const allSelectDiv = document.getElementById('allSelect')

let colorTabToFind = null

document.getElementById('startBtn').addEventListener('click', () => {
    launchGame()
})

function launchGame() {
    setAleaColorTable()
    allSelectDiv.innerHTML = ""
    generateLineSelect()
    Confetti.stopAnimationConfetti()
    console.log(colorTabToFind);
}

// check propal
function checkPropal() {
    let allSelect = allSelectDiv.querySelectorAll("select")
    // on fait un tableau depuis le noeud HTML select (on aurait pu le faire avec une string aussi)
    // pour chaque Select, récupérer la valeur
    let propal = Array.from(allSelect, select => select.value).slice(0 - nbColorToFind)

    let cptGoodPlace = 0
    let cptBadPlace = 0
    // une copie simple d'un objet (donc ici Array) revient juste à rendre les 2 données interdépendantes. Il faut utiliser cette [...méthode] pour copier un Array 
    let colorTabToFindCopy = [...colorTabToFind]

    // on parcourt le tab de propal
    // pour vérifier les éléments bien placés 
    for (let i = 0; i < propal.length; i++) {
        // on compare avec la couleur dans le tableau masqué, au même endroit
        // pions rouges :
        if (propal[i] == colorTabToFindCopy[i]) {
            // la proposition est bonne (bonne couleur, bonne place) :
            cptGoodPlace++
            // permet de modifier la valeur de la case afin qu'elle ne soit pas trouvée 2 fois 
            colorTabToFindCopy[i] = "trouvé"
            propal[i] = "trouvéCotéPropal"
        }
    }

    // on parcourt le tab de propal
    // pour vérifier les éléments de la bonne couleur mais mal placés 
    for (let i = 0; i < propal.length; i++) {
        // on compare avec la couleur dans le tableau masqué, au même endroit
        if (propal[i] != "trouvéCotéPropal") {
            let finded = false
            for (let j = 0; j < colorTabToFindCopy.length; j++) {
                if (!finded) {
                    if (propal[i] == colorTabToFindCopy[j]) {
                        cptBadPlace++
                        propal[i] = "trouvéCotéPropal"
                        // rappel : pour pas chercher une couleur déjà trouvée
                        colorTabToFindCopy[j] = "trouvé"
                        finded = true
                    }
                }
            }
        }
    }

    // ajout de la ligne de communication 
    let lineResponse = document.createElement("div")
    lineResponse.innerText = `Ok : ${cptGoodPlace} | Mal placé : ${cptBadPlace}`
    allSelectDiv.appendChild(lineResponse)

    // si on a autant de bonnes réponses que de cases dans le tableau, on a gagné
    if (cptGoodPlace == colorTabToFind.length) {
        Confetti.launchAnimationConfetti()
        setTimeout(() => {
            Confetti.stopAnimationConfetti()
        }, 5000);
    }

    // on génère des nouveaux select pour faire une nouvelle propal
    generateLineSelect()
}

function generateLineSelect() {
    let line = document.createElement('div')
    // reprendre les infos des couleurs générées dessous et les afficher dans le HTML
    for (let index = 0; index < nbColorToFind; index++) {
        generateSelect(line)
    }

    // générer un btn ok pour valider la propal
    let btn = document.createElement("button")
    btn.innerText = "Valider"
    btn.classList.add("validationBtn")
    line.appendChild(btn)
    btn.addEventListener('click', () => {
        checkPropal()
    })
    allSelectDiv.appendChild(line)
}

// générer des select / options dans le html pour choisir une couleur
function generateSelect(target) {
    let mySelect = document.createElement("select")
    colors.forEach(color => {
        let colorOption = document.createElement("option")
        // colorOption.innerHTML = color
        colorOption.value = color
        colorOption.style.backgroundColor = color
        mySelect.appendChild(colorOption)
    })
    mySelect.style.backgroundColor = mySelect.value

    // permet d'utiliser la couleur pour l'afficher dans le select
    mySelect.addEventListener('change', (e) => {
        e.target.style.backgroundColor = e.target.value
    })

    // permet de conserver la couleur après avoir entré sur valider
    target.appendChild(mySelect)
}

// couleurs tableau de couleurs aléatoires
function setAleaColorTable(size = 4) {
    // générer un tableau de couleurs d'une taille spé 
    colorTabToFind = []
    // on aurait pû mettre index < colors.length mais le memory ne demande que 4 cases donc inutile
    for (let index = 0; index < size; index++) {
        colorTabToFind.push(getAleaColor())
    }
}

function getAleaColor() {
    let aleaIndex = Utils.getRandomInt(colors.length)
    let aleaColor = colors[aleaIndex]
    return aleaColor
}