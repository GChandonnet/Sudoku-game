import eel


class sudoku_solver:

    def __init__(self, board):
        self.board = self.createboard(board)

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

    def find_empty(self):
        for i in range(len(self.board)):
            for j in range(len(self.board[0])):
                if self.board[i][j] == 0:
                    return (i, j)
        return None

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
        find = self.find_empty()
        if not find:
            return True
        else:
            row, col = find

        for i in range(1, 10):
            if self.valid(i, (row, col)):

                self.board[row][col] = i
                eel.addtogrid(row, col, i)
                if self.solve():
                    return True

                self.board[row][col] = 0
                eel.addtogrid(row, col, None)
        return

    # def returngrid(self):

    #     return self.board
