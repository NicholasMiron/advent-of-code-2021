import sys
from pathlib import Path
with open(Path(__file__).absolute().parent.parent / 'inputs' / Path(__file__).parent / 'input.txt') as file:
    problem_input = [int(line) for line in file]
sample_input = None


def problem1_solution():
    pass


def problem2_solution():
    pass


if '-s' in sys.argv:
    print("Solution 1:", problem1_solution(problem_input))
    print("Solution 2:", problem2_solution(problem_input))
else:
    print("Sample 1 - Expected: <x> Got:", problem1_solution(sample_input))
    print("Sample 2 - Expected: <x> Got:", problem2_solution(sample_input))
