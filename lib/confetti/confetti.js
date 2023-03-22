export class Confetti {
    // gestion des confettis
    static launchAnimationConfetti() {
        let animateDiv = document.createElement("div")
        animateDiv.innerHTML = ""
        animateDiv.id = "allConfettis"
        for (let i = 0; i < 100; i++) {
            // on crée 100 confettis auxquels on ajoute la classe confetti déjà stylisée en CSS
            let confetti = document.createElement("div")
            confetti.classList.add('confetti')
            confetti.style.left = this.getRandomArbitrary(0, 100) + '%'
            // animations différentes pour chaque confetti
            confetti.style.animationDelay = 50 * i + "ms"
            // couleur aléaoire
            confetti.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
            animateDiv.appendChild(confetti)
        }
        document.body.appendChild(animateDiv)
    }
    
    static stopAnimationConfetti() {
        let animateDiv = document.getElementById('allConfettis')
        if(animateDiv != null) {
            animateDiv.innerHTML = ""
            animateDiv.remove()
        }
    }

    static getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

}
