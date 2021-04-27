import itertools
import eel

class sudoku_solver:

    def __init__(self, board):
        self.board = self.createboard(board)
        self.zero_count = self.count_zero()
        self.liste_candidats = self.candidats()

    def createboard(self, board):
        """Take a string of 81 char and change that into a board
        if the char is 0 or '.' put a 0 in is place."""
        grid = []
        n = 0
        while n < 81:
            line = []
            i = 0
            while i < 9:
                if board[n+i] == '.' or board[n+i] == '0':
                    line.append(0)
                else:
                    line.append(int(board[n+i]))
                i += 1
            grid.append(line)
            n += 9
        return grid

    def count_zero(self):

        count = 0
        for row in self.board:
            for element in row:
                if element == 0:
                    count += 1
        return count

    def valid_candidats(self, pos):

        liste = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        candidats = 1
        while candidats < 10:

            # Vérifie la ligne
            for i in range(len(self.board[0])):
                if self.board[pos[0]][i] == candidats and pos[1] != i:
                    try:
                        liste.remove(candidats)
                    except:
                        continue

            # Vérifier la colonne
            for i in range(len(self.board)):
                if self.board[i][pos[1]] == candidats and pos[0] != i:
                    try:
                        liste.remove(candidats)
                    except:
                        continue

            # vérifier la boite
            box_x = pos[1] // 3
            box_y = pos[0] // 3

            for i in range(box_y * 3, box_y * 3 + 3):
                for j in range(box_x * 3, box_x * 3 + 3):
                    if self.board[i][j] == candidats and (i, j) != pos:
                        try:
                            liste.remove(candidats)
                        except:
                            continue

            candidats += 1
        return liste

    def candidats(self):
        """Trouve les contestants possible dans
        chaque case de la grille. Renvoie une liste
        de liste."""
        liste_candidats = []

        for i in range(len(self.board)):
            for j in range(len(self.board[0])):
                pos = (i, j)
                num = self.board[i][j]
                if num == 0:
                    liste_temp = list()
                    liste_temp.append(self.valid_candidats(pos))
                    if len(liste_temp[0]) == 1:
                        self.board[i][j] = liste_temp[0][0]
                        eel.addtogrid(i, j, liste_temp[0][0])
                        liste_candidats.append([liste_temp[0][0]])
                    else:
                        liste_candidats.append(liste_temp[0])
                else:
                    liste_candidats.append([num])

        return liste_candidats

    def find_empty(self):
        count = 0
        for i in range(len(self.board)):
            for j in range(len(self.board[0])):

                if self.board[i][j] == 0:
                    return (i, j), count
                count += 1
        return None, count

    def valid(self, num, pos):
        # Vérifie la ligne
        for i in range(len(self.board[0])):
            if self.board[pos[0]][i] == num and pos[1] != i:
                return False

        # Vérifier la colonne
        for i in range(len(self.board)):
            if self.board[i][pos[1]] == num and pos[0] != i:
                return False

        # vérifier la boite
        box_x = pos[1] // 3
        box_y = pos[0] // 3

        for i in range(box_y * 3, box_y * 3 + 3):
            for j in range(box_x * 3, box_x * 3 + 3):
                if self.board[i][j] == num and (i, j) != pos:
                    return False

        return True

    def solve(self):

        find, count = self.find_empty()

        if not find:
            return True
        else:
            row, col = find
        for i in self.liste_candidats[count]:
            if self.valid(i, (row, col)):
                self.board[row][col] = i
                eel.addtogrid(row, col, i)

                if self.solve():
                    return True

                self.board[row][col] = 0
                eel.addtogrid(row, col, None)


        return False

    def print_board(self):

        for i in range(len(self.board)):
            if i % 3 == 0 and i != 0:
                print('- - - - - - - - - - - -')

            for j in range(len(self.board[0])):
                if j % 3 == 0 and j != 0:
                    print(' | ', end="")
                if j == 8:
                    print(self.board[i][j])
                else:
                    print(str(self.board[i][j]) + " ", end="")
