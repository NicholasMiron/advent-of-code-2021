import sys
from pathlib import Path

with open(Path(__file__).absolute().parent.parent / 'inputs' / Path(__file__).parent / 'input.txt') as file:
    problem_input = list(map(lambda x: [x[0], int(x[1])], [line.split(' ') for line in file]))

sample_input = [
    ['forward', 5],
    ['down', 5],
    ['forward', 8],
    ['up', 3],
    ['down', 8],
    ['forward', 2],
]


def problem1_solution(instructions):
    depth = 0
    distance_traveled = 0

    for instruction, distance in instructions:
        if instruction == 'forward':
            distance_traveled += distance
        elif instruction == 'down':
            depth += distance
        elif instruction == 'up':
            depth -= distance

    return depth * distance_traveled


def problem2_solution(instructions):
    distance_traveled = 0
    depth = 0
    aim = 0

    for instruction, distance in instructions:
        if instruction == 'forward':
            distance_traveled += distance
            depth += (aim * distance)
        elif instruction == 'down':
            aim += distance
        elif instruction == 'up':
            aim -= distance

    return depth * distance_traveled


if '-s' in sys.argv:
    print("Solution 1:", problem1_solution(problem_input))
    print("Solution 2:", problem2_solution(problem_input))
else:
    print("Sample 1 - Expected: 150 Got:", problem1_solution(sample_input))
    print("Sample 2 - Expected: 900 Got:", problem2_solution(sample_input))
