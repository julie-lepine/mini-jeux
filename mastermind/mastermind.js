// Utils pour importer des fonctions que l'on utilisera tout le temps, ici le getRandomInt()
import { Utils } from "../lib/Utils/utils.js";

/* TODO 
- Générer la combinaison secrète de 4 couleurs
- Pouvoir proposer des combinaisons
- Vérifier que la combinaison secrète = propal
- Gérer début et fin de partie
 
*/

const colors = ["purple", "black", "yellow", "pink"]

console.log(colors[Utils.getRandomInt(4)])