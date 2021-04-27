from random import choice
from random import randrange
import Peter_Norvig as pn
import backtracking as bt
import contestants
import eel

eel.init('web')


# ----------------------------Script du générateur de sudoku ---------------------------

@eel.expose
def generate_random_sudoku(n):
    """Générer a partir de rien un Sudoku solvable
    ou n = le nombre de case visible"""
    nums = []
    while len(nums) < 9:
        num = str(randrange(1, 10))
        if num not in nums:
            nums.append(num)

    sequence = ''.join(nums) + ('0'*72)
    ss = pn.sudoku_solver(sequence)
    results = ss.solve()
    complete_sequence = ''

    for tup in results.values():
        complete_sequence += tup[0].rstrip('\n')

    nums = []
    while len(nums) < (81-n):
        idx = randrange(0, 81)
        if idx not in nums:
            complete_sequence = complete_sequence[:idx] + \
                '0' + complete_sequence[idx+1:]
            nums.append(idx)

    eel.returnedUnsolvedGrid(complete_sequence)

# --------------------------------------------------------------------------------------


# Backtracking Algo.-------------
@eel.expose
def backtrackingSolve(grid):
    ss = bt.sudoku_solver(grid)
    ss.solve()

# Contestants Algo ---------------


@eel.expose
def ContestantSolve(grid):
    ss = contestants.sudoku_solver(grid)
    ss.solve()

# Peter Norvig's Algorithme


@eel.expose
def peterNorvigSolve(grid):
    ss = pn.sudoku_solver(grid)

    results = ss.solve()
    complete_sequence = ''
    for tup in results.values():
        complete_sequence += tup[0].rstrip('\n')

    eel.returnedsolvedGrid(complete_sequence, grid)


eel.start('index.html')
