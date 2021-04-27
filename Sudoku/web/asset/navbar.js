// button-Algorithms
const changetext = (newtext) => {

    document.querySelector('#button-Algorithms').innerHTML = newtext

} 

// Bouton pause
// ajoute un blur au tableau, en lui ajoutant la class mask
// le mask est créer dans css.
const pauseGame = () => {

    const Tableau = document.querySelector('#pause-mask')
    console.log(Tableau.className)

    if (Tableau.className === "mask") {
        Tableau.classList.remove('mask')
    } else {
        Tableau.classList.add('mask')
    }
}
