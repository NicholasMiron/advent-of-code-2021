import sys
from pathlib import Path
with open(Path(__file__).absolute().parent.parent / 'inputs' / Path(__file__).parent / 'input.txt') as file:
    problem_input = [int(line) for line in file]
sample_input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]


def problem1_solution(depths):
    last_depth = float("-inf")
    count_increasing_depth = -1

    for depth in depths:
        if depth > last_depth:
            count_increasing_depth += 1
        last_depth = depth

    return count_increasing_depth


def problem2_solution(depths, window_len = 3):
    last_depth = float("-inf")
    count_increasing_depth = -1

    for i in range(len(depths) - window_len + 1):
        cur_depth = 0
        for j in range(window_len):
            cur_depth += depths[i + j]

        if cur_depth > last_depth:
            count_increasing_depth += 1

        last_depth = cur_depth
    return count_increasing_depth


if '-s' in sys.argv:
    print("Solution 1:", problem1_solution(problem_input))
    print("Solution 2:", problem2_solution(problem_input))
else:
    print("Sample 1 - Expected: 7 Got:", problem1_solution(sample_input))
    print("Sample 2 - Expected: 5 Got:", problem2_solution(sample_input))
