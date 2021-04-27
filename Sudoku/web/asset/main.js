const ajouterErreurChamp = (ligne, col) => {
    const input = document.getElementById('case' + ligne + '-' + col)
    input.classList.add('invalide')
    input.addEventListener('input', () => {
        input.classList.remove('invalide')
        verifier()
    }, { once : true})
}


const verifier = () => {
    // Vérifier que les nombres saisis sont bien de 1 à 9.

    // Récupérer tous les input de la page
    const listInput = document.querySelectorAll('input')


    // ENlever tous les classes invalide
    for (const input of listInput) {
        input.classList.remove('invalide')
    }

    // pour chacun des input on va vérifier que le champs est valide
    for (const input of listInput) {
        // vérifier que le champs est valide
        const validiteInput = input.checkValidity()

        if (validiteInput === false) {
            // si c'est pas valide, arretez le programme
            return
        }
    }

    // Tableau qui contient tous les lignes
    const sudoku = []

    // Récupérer toutes les valeurs. ligne = 0 : la variable commence a quoi, 
    // ligne < 9 : la boucle fini quand, a la fin de chaque boucle on fait quoi.
    for (let ligne = 0; ligne < 9; ligne += 1) {
        const sudokuLigne = []

        for (let col = 0; col < 9; col += 1) {
            const identifiant = 'case' + ligne + '-' + col
            const input = document.getElementById(identifiant)
            const valeur = input.value  //<----renvoie un nombre sous forme de texte
            // VÉrifier si la valeur est vide ou pas, et mettre sous forme de nombre.
            const nombre = valeur === ''
            ? ''
            : parseInt(valeur, 10)

            // Ajouter la valeur a la ligne
            sudokuLigne.push(nombre)
            }
        // ajouter la ligne au sudoku
        sudoku.push(sudokuLigne)
        }

        // Vérifier qu'il n'y est aps de doublons dans les lignes.
        
        // Parcourir les lignes
        for (let ligne = 0; ligne < 9; ligne += 1) {
            const liste = new Set()

            // Parcourir les élément de la  ligne
            for (let col = 0; col < 9; col += 1) {
                const valeur = sudoku[ligne][col]

                // Tester si la valeur est vide
                // Si la valeur est vide ne rien faire
                if (valeur ==='') {

                } else {
                    const valeurExiste = liste.has(valeur)

                    if (valeurExiste) {
                        // Ajouter une classe d'erreur au champs pour le montré a l'utilisateur
                        ajouterErreurChamp(ligne, col)
                        } else {
                        liste.add(valeur)
                    }
                }
            }
    }
        // Parcourir les colonnes
        for (let col = 0; col < 9; col += 1) {
            const liste = new Set()

            // Parcourir les élément de la  ligne
            for (let ligne = 0; ligne < 9; ligne += 1) {
                const valeur = sudoku[ligne][col]

                // Tester si la valeur est vide
                // Si la valeur est vide ne rien faire
                if (valeur ==='') {

                } else {
                    const valeurExiste = liste.has(valeur)

                    if (valeurExiste) {
                        // Ajouter une classe d'erreur au champs pour le montré a l'utilisateur
                        ajouterErreurChamp(ligne, col)
                    } else {
                        liste.add(valeur)
                    }
                }
            }
    }

    // Indices des carrés
    const carres = [
        [
            [0,0], [0, 1], [0,2],
            [1,0], [1, 1], [1,2],
            [2,0], [2, 1], [2,2]
        ],
        [
            [0,3], [0, 4], [0,5],
            [1,3], [1, 4], [1,5],
            [2,3], [2, 4], [2,5]
        ],
        [
            [0,6], [0, 7], [0,8],
            [1,6], [1, 7], [1,8],
            [2,6], [2, 7], [2,8]
        ],
        [
            [3,0], [3, 1], [3,2],
            [4,0], [4, 1], [4,2],
            [5,0], [5, 1], [5,2]
        ],
        [
            [3,3], [3, 4], [3,5],
            [4,3], [4, 4], [4,5],
            [5,3], [5, 4], [5,5]
        ],
        [
            [3,6], [3, 7], [3,8],
            [4,6], [4, 7], [4,8],
            [5,6], [5, 7], [5,8]
        ],
        [
            [6,0], [6, 1], [6,2],
            [7,0], [7, 1], [7,2],
            [8,0], [8, 1], [8,2]
        ],
        [
            [6,3], [6, 4], [6,5],
            [7,3], [7, 4], [7,5],
            [8,3], [8, 4], [8,5]
        ],
        [
            [6,6], [6, 7], [6,8],
            [7,6], [7, 7], [7,8],
            [8,6], [8, 7], [8,8]
        ],
    ]

    // Parcourir les carrés

    for (const carre of carres) {
        const liste = new Set()
        for (const element of carre) {
            const ligne = element[0]
            const col = element[1]

            const valeur = sudoku[ligne][col]

            // Tester si la valeur est vide
            // Si la valeur est vide ne rien faire
            if (valeur ==='') {

            } else {
                const valeurExiste = liste.has(valeur)

                if (valeurExiste) {
                    // Ajouter une classe d'erreur au champs pour le montré a l'utilisateur
                    ajouterErreurChamp(ligne, col)
                } else {
                    liste.add(valeur)
                }
            }
        }
    }  
}

    



// Récuper le bouton
const button = document.getElementById('button-verifier')
// Assigner l'événement click à la function vérifier
button.addEventListener('click', verifier)


function highlightPeers(selectionRow, selectionCol) {
    //
    
    const listInput = document.querySelectorAll('input')
    for (const input of listInput) {
        input.classList.remove('selectionPeers')
        input.classList.remove('sameNumber')
    }

    for (let col = 0; col < 9; col += 1) {
        identifiant = 'case' + selectionRow + '-' + col
        const input = document.getElementById(identifiant)
        input.classList.add('selectionPeers')
    }
    for (let row = 0; row < 9; row += 1) {
        identifiant = 'case' + row + '-' + selectionCol
        const input = document.getElementById(identifiant)
        input.classList.add('selectionPeers')
    }
    // Liste de tous les adresses des cellules du grid par carré
    const carres = [
        [
            [0,0], [0, 1], [0,2],
            [1,0], [1, 1], [1,2],
            [2,0], [2, 1], [2,2]
        ],
        [
            [0,3], [0, 4], [0,5],
            [1,3], [1, 4], [1,5],
            [2,3], [2, 4], [2,5]
        ],
        [
            [0,6], [0, 7], [0,8],
            [1,6], [1, 7], [1,8],
            [2,6], [2, 7], [2,8]
        ],
        [
            [3,0], [3, 1], [3,2],
            [4,0], [4, 1], [4,2],
            [5,0], [5, 1], [5,2]
        ],
        [
            [3,3], [3, 4], [3,5],
            [4,3], [4, 4], [4,5],
            [5,3], [5, 4], [5,5]
        ],
        [
            [3,6], [3, 7], [3,8],
            [4,6], [4, 7], [4,8],
            [5,6], [5, 7], [5,8]
        ],
        [
            [6,0], [6, 1], [6,2],
            [7,0], [7, 1], [7,2],
            [8,0], [8, 1], [8,2]
        ],
        [
            [6,3], [6, 4], [6,5],
            [7,3], [7, 4], [7,5],
            [8,3], [8, 4], [8,5]
        ],
        [
            [6,6], [6, 7], [6,8],
            [7,6], [7, 7], [7,8],
            [8,6], [8, 7], [8,8]
        ],
    ]

    // Parcourir les carrés
    for (const carre of carres) {
        for (element of carre) {
            const row = element[0]
            const col = element[1]
            // Trouver le carré contenant la selection
            if(row === selectionRow && col === selectionCol) {
                // une fois trouver on le met dans la variable selectionBox
                const selectionBox = carre
                // Une fois sorti du for loop, on met en forme les elements
                // dans la selectionBox.
                for (const element of selectionBox) {
                    const row = element[0]
                    const col = element[1]
            
                    const identifiant = 'case' + row + '-' + col
                    const input = document.getElementById(identifiant)
                    input.classList.add('selectionPeers')
                }

            }
        }
    }
    // Trouver les mêmes valeurs
    // vérifier si la cellule sélectionné est vide
    const selectIdentifiant = 'case' + selectionRow + '-' + selectionCol
    const selectInput = document.getElementById(selectIdentifiant)
    if (selectInput.value !== '' && selectInput.value !== null) {
        for (input of listInput) {
            if (input.value === selectInput.value) {
                input.classList.add('sameNumber')
            }
        }
    }    
}