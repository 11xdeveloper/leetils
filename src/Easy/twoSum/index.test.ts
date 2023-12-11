import { test, expect } from 'bun:test';
import twoSum from '.';

test('twoSum: Given an array of numbers and a target number, it returns the indices of the numbers that sum to the target', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(twoSum([3, 3], 6)).toStrictEqual([0, 1]);
});
