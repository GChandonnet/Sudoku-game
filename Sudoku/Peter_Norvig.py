import time


class sudoku_solver:
    """Classe permettant la résolution de casse-tête Sudoku
        donné sous forme de texte. avec des 0 ou des '.' pour
        les espaces vides."""

    def __init__(self, grid):

        self.grid = grid
        self.digits = '123456789'
        self.rows = 'ABCDEFGHI'
        self.cols = self.digits
        self.squares = self.cross(self.rows, self.cols)
        self.unitlist = ([self.cross(self.rows, c) for c in self.cols] +
                         [self.cross(r, self.cols) for r in self.rows] +
                         [self.cross(rs, cs) for rs in ('ABC', 'DEF', 'GHI') for cs in ('123', '456', '789')])  # divise chaque lignes, colonnes et boite en listes.
        self.units = dict((s, [u for u in self.unitlist if s in u])
                          for s in self.squares)  # Regroupe dans un dictionnaire, tous les listes de Unitlist (values) associés a chaque case (keys).
        self.peers = dict((s, set(sum(self.units[s], []))-set([s]))
                          for s in self.squares)  # Regroupe dans un dictionnaire, tous les cases (values) a vérifier par case (keys)

    def cross(self, rows, cols):
        """Produit croisé des élements dans les lignes (rows)
         et les éléments des colonnes (cols)."""
        return [row+col for row in rows for col in cols]

    def parse_grid(self):
        """Convertis le grid en un dictionnaire des candidats possible, {square: digits}, ou
        retourne False si une contradiction est détecté."""
        # au départ, chaque square (ex: A1) peut être n'importe quel digit; après on associe les valeurs du grid.
        values = dict((square, self.digits) for square in self.squares)
        for square, digit in self.grid_values().items():
            if digit in self.digits and not self.assign(values, square, digit):
                # Fail si on ne peut assigné aucun digit au square.
                return False
        return values

    def grid_values(self):
        "convertie le grid (forme str) en un dictionnaire de {square: char} avec '0' ou '.' pour les vides."
        chars = [char for char in self.grid if char in self.digits or char in '0.']
        assert len(chars) == 81  # s'assure que le total est de 81.
        return dict(zip(self.squares, chars))

    def assign(self, values, s, d):
        """Éléminer tous les autres valeurs (sauf d) des values[s] et propage.
        Retourne valeurs, sauf retourne faux si un contradiction est détecté."""
        other_values = values[s].replace(d, '')
        if all(self.eliminate(values, s, d2) for d2 in other_values):
            return values
        else:
            return False

    def eliminate(self, values, square, digit):
        """Élimine digit des values[square]; propage quand valeurs ou places <= 2.
        Retourne valeurs, excepté s'il y a un condradiction détecté: return False."""
        if digit not in values[square]:
            return values  # Déjà éléminé
        values[square] = values[square].replace(digit, '')
        # (1) Si un square est réduit a une seul valeur (d2), alors éliminé d2 de ses peers.
        if len(values[square]) == 0:
            return False  # Contradiction: enlever la dernière valeur
        elif len(values[square]) == 1:
            d2 = values[square]
            if not all(self.eliminate(values, s2, d2) for s2 in self.peers[square]):
                return False
        # (2) Si un unité (unit) est réduit a seulement une place pour une valeur donnée (digit), alors l'introduire ici.
        for unit in self.units[square]:
            dplaces = [square for square in unit if digit in values[square]]
            if len(dplaces) == 0:
                return False  # Contradiction: pas de place pour cette valeur
            elif len(dplaces) == 1:
                # digit peut seulement être a un endroit dans l'unité; l'ajouté.
                if not self.assign(values, dplaces[0], digit):
                    return False
        return values

    def solve(self):
        results = self.search(self.parse_grid())
        return results

    def search(self, values):
        """Utilise la recherche en profondeur en premier
         et propagation, essais par la suite tous les valeurs possibles."""

        if values is False:
            return False  # a échoué précédament
        if all(len(values[square]) == 1 for square in self.squares):
            return values
        # Choisi le carré (square) vide avec le moins de possibilités
        n, square = min((len(values[square]), square)
                        for square in self.squares if len(values[square]) > 1)
        return self.some(self.search(self.assign(values.copy(), square, digit))
                         for digit in values[square])

    def some(self, seq):
        "Retourne un élément du séquentiel s'il est vrai."
        for element in seq:
            if element:
                return element
        return False

    def print_board(self, results):
        """Imprime un version 2-d du puzzle
        """
        lis = []
        for tup in results.values():
            lis.append(tup[0].rstrip('\n'))

        lis_lis = []
        while len(lis) > 0:

            lis_lis.append(lis[:9])
            del lis[:9]

        for i in range(len(lis_lis)):
            if i % 3 == 0 and i != 0:
                print('------+-------+------')

            for j in range(len(lis_lis[0])):
                if j % 3 == 0 and j != 0:
                    print('| ', end="")
                if j == 8:
                    print(lis_lis[i][j])
                else:
                    print(str(lis_lis[i][j]) + " ", end="")
