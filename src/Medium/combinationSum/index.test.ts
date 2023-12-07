import { test, expect } from 'bun:test';
import combinationSum from '.';

test('combinationSum: Given an array of numbers and a target number, it returns all combinations (of any length) of numbers that sum to the target. Each index in the array may only be used once', () => {
    expect(combinationSum([2, 3, 6, 7], 7)).toStrictEqual([[2, 2, 3], [7]]);
    expect(combinationSum([2, 3, 5], 8)).toStrictEqual([
        [2, 2, 2, 2],
        [2, 3, 3],
        [3, 5]
    ]);
    expect(combinationSum([2], 1)).toStrictEqual([]);
});
