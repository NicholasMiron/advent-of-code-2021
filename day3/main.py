import sys
import math

from pathlib import Path

with open(Path(__file__).absolute().parent.parent / 'inputs' / Path(__file__).parent / 'input.txt') as file:
    problem_input = file.read().split('\n')

sample_input = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
]


def problem1_solution(bin_numbers):
    digit_counts = [0] * len(bin_numbers[0])

    for bin_number in bin_numbers:
        for i in range(len(bin_number)):
            digit_counts[i] = digit_counts[i] + int(bin_number[i])

    most_frequent_digit = ''
    least_frequent_digit = ''
    for digit in digit_counts:
        if digit > math.floor(len(bin_numbers) / 2):
            most_frequent_digit += '1'
            least_frequent_digit += '0'
        else:
            most_frequent_digit += '0'
            least_frequent_digit += '1'

    return int(most_frequent_digit, 2) * int(least_frequent_digit, 2)


def split_by_val_at_index(arr, i):
    val_dict = {}

    for num in arr:
        if num[i] in val_dict:
            val_dict[num[i]].append(num)
        else:
            val_dict[num[i]] = [num]

    return val_dict


def filter_most_frequent_bin_nums_index(bin_numbers, index):
    freq_dict = split_by_val_at_index(bin_numbers, index)
    return freq_dict['1'] if len(freq_dict['1']) >= len(freq_dict['0']) else freq_dict['0']


def filter_least_frequent_bin_nums_index(bin_numbers, index):
    freq_dict = split_by_val_at_index(bin_numbers, index)
    return freq_dict['0'] if len(freq_dict['0']) <= len(freq_dict['1']) else freq_dict['1']


def problem2_solution(bin_numbers):
    pref_0 = bin_numbers.copy()
    pref_1 = bin_numbers.copy()

    cur_i = 0
    while len(pref_1) > 1:
        pref_1 = filter_most_frequent_bin_nums_index(pref_1, cur_i)
        cur_i += 1

    cur_i = 0
    while len(pref_0) > 1:
        pref_0 = filter_least_frequent_bin_nums_index(pref_0, cur_i)
        cur_i += 1

    return int(pref_0[0], 2) * int(pref_1[0], 2)


if '-s' in sys.argv:
    print("Solution 1:", problem1_solution(problem_input))
    print("Solution 2:", problem2_solution(problem_input))
else:
    print("Sample 1 - Expected: 198 Got:", problem1_solution(sample_input))
    print("Sample 2 - Expected: 230 Got:", problem2_solution(sample_input))
