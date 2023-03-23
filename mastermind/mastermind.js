// Utils pour importer des fonctions que l'on utilisera tout le temps, ici le getRandomInt()
import { Utils } from "../lib/Utils/utils.js";

/* TODO 
X Générer la combinaison secrète de 4 couleurs
- Pouvoir proposer des combinaisons
- Vérifier que la combinaison secrète = propal
- Gérer début et fin de partie
*/

const colors = ["purple", "white", "grey", "pink"]
let colorTabToFind = null
const nbColorToFind = 4

document.getElementById('startBtn').addEventListener('click', () => {
    launchGame()
})

function launchGame() {
    setAleaColorTable()
    document.getElementById('allSelect').innerHTML = ""
    for (let index = 0; index < nbColorToFind; index++) {
        generateSelect("allSelect")        
    }
    console.log(colorTabToFind)
}

// générer des select / options dans le html pour choisir une couleur
function generateSelect(idCible) {
    let mySelect = document.createElement("select")
    colors.forEach(color => {
        let colorOption = document.createElement("option")
        colorOption.value = color
        colorOption.style.backgroundColor = color
        mySelect.appendChild(colorOption)
    })
    document.getElementById(idCible).appendChild(mySelect)
}

// couleurs aléatoires
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