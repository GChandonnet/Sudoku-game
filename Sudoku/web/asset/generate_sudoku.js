// fonction pour appeler la fonction de python
function importerGrille(difficulty) {
    eel.generate_random_sudoku(difficulty);
}

//fonction appeler depuis python pour retourner la grille.
eel.expose(returnedUnsolvedGrid);
function returnedUnsolvedGrid(answer) {
    // Parcourir les lignes du tableau
    for (let ligne = 0;ligne < 9; ligne +=1) {
        //Parcourire les éléments de la ligne
        for (let col = 0; col < 9; col += 1) {
            
            // Remettre la grille a 0.
            const identifiant= 'case' + ligne + '-' + col
            const input = document.getElementById(identifiant)
            input.readOnly = false

            //Ajouter la valeur au champ
            input.value = null
        }
    }
    
    var n = answer;
    var grid = []

    // Créer la liste de liste qui représente le tableau
    grid.push(n.substr(0,9).split(''))
    grid.push(n.substr(9,9).split(''))
    grid.push(n.substr(18,9).split(''))
    grid.push(n.substr(27,9).split(''))
    grid.push(n.substr(36,9).split(''))
    grid.push(n.substr(45,9).split(''))
    grid.push(n.substr(54,9).split(''))
    grid.push(n.substr(63,9).split(''))
    grid.push(n.substr(72,9).split(''))


    // Créer la liste de liste qui représente le tableau

    for (let ligne = 0;ligne < 9; ligne +=1) {
        //Parcourire les éléments de la ligne
        for (let col = 0; col < 9; col += 1) {
            const valeur = grid[ligne][col]

            //Pour chaque champ
            if (valeur != 0) {
              //Rendre un champ texte non modifiable
              const identifiant= 'case' + ligne + '-' + col
              const input = document.getElementById(identifiant)
              input.readOnly = true

              //Ajouter la valeur au champ
              input.value = valeur
                
            }
        }
    }
    // Démarrer un timer qui sera afficher a l'écran  
}
// -------------------------------------------------------------------------------------
// Extraire le sudoku (valeur readonly seulement) sous forme de texte
// -------------------------------------------------------------------------------------
function sendingSudokuToSolve() {
    
    // Créer la version texte du sudoku.
    var sequenceString = ''
    for (let ligne = 0; ligne < 9; ligne +=1) {
        for (let col = 0; col < 9; col +=1) {
            const identifiant= 'case' + ligne + '-' + col
            const input = document.getElementById(identifiant)

            if (input.readOnly === true) {
                sequenceString += input.value
            } else {
                // les valeurs qui ne sont pas readonly sont remplacé par des '.'
                // Comme ca le sudoku envoyer a l'algorithme de résolution,
                // ne sera pas influencé par les réponses de l'utilisateur
                sequenceString += '.'
                input.value = null
            }
        }
    }
    // Déterminer l'algorithme choisi.
    const algorithme = document.querySelector('#button-Algorithms').innerHTML
    // Déclencher l'algorithme choisi pour résoudre
    if (algorithme === 'Backtracking') {
        eel.backtrackingSolve(sequenceString)
    } else if (algorithme === 'Contestants') {
        eel.ContestantSolve(sequenceString)
    } else if (algorithme === 'Peter Norvig') {
        eel.peterNorvigSolve(sequenceString)
    }
}


// Renvoie chaque nouvelle valeur pour visionnez en temps réel l'algorithme
eel.expose(addtogrid);
function addtogrid(ligne, col, valeur) {
    const identifiant = 'case' + ligne + '-' + col
    const input = document.getElementById(identifiant)
    input.value = valeur
}

eel.expose(returnedsolvedGrid);
function returnedsolvedGrid(answer, unsolveGrid) {
    // Parcourir les lignes du tableau
    for (let ligne = 0;ligne < 9; ligne +=1) {
        //Parcourire les éléments de la ligne
        for (let col = 0; col < 9; col += 1) {
            
            // Remettre la grille a 0.
            const identifiant= 'case' + ligne + '-' + col
            const input = document.getElementById(identifiant)
            // Vérifier pour trouver les valeurs qui sont modifiable
            if(input.readOnly === false) {
                input.value = null
            }
        }
    }

    var n = answer;
    var solved_grid = []

    // Créer la liste de liste qui représente le tableau
    solved_grid.push(n.substr(0,9).split(''))
    solved_grid.push(n.substr(9,9).split(''))
    solved_grid.push(n.substr(18,9).split(''))
    solved_grid.push(n.substr(27,9).split(''))
    solved_grid.push(n.substr(36,9).split(''))
    solved_grid.push(n.substr(45,9).split(''))
    solved_grid.push(n.substr(54,9).split(''))
    solved_grid.push(n.substr(63,9).split(''))
    solved_grid.push(n.substr(72,9).split(''))
    
    var n = unsolveGrid;
    var unsolve_grid = []

    // Créer la liste de liste qui représente le tableau
    unsolve_grid.push(n.substr(0,9).split(''))
    unsolve_grid.push(n.substr(9,9).split(''))
    unsolve_grid.push(n.substr(18,9).split(''))
    unsolve_grid.push(n.substr(27,9).split(''))
    unsolve_grid.push(n.substr(36,9).split(''))
    unsolve_grid.push(n.substr(45,9).split(''))
    unsolve_grid.push(n.substr(54,9).split(''))
    unsolve_grid.push(n.substr(63,9).split(''))
    unsolve_grid.push(n.substr(72,9).split(''))
    
   
    console.log(unsolve_grid)
    console.log(solved_grid)

    for (let ligne = 0;ligne < 9; ligne +=1) {
        //Parcourire les éléments de la ligne
        for (let col = 0; col < 9; col += 1) {
            
            //Pour chaque champ
            if (unsolve_grid[ligne][col] === '.') {
                const valeur = solved_grid[ligne][col]

              const identifiant= 'case' + ligne + '-' + col
              const input = document.getElementById(identifiant)

              //Ajouter la valeur au champ
              input.value = valeur
                
            }
        }
    }
    // Démarrer un timer qui sera afficher a l'écran  
}

