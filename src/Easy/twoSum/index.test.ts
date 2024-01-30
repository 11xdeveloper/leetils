import { test, expect, describe } from 'bun:test';
import { twoSum } from '../..';

describe('Two Sum', () => {
    test(`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

    You may assume that each input would have exactly one solution, and you may not use the same element twice.
    
    You can return the answer in any order.`, () => {
        expect(twoSum([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
        expect(twoSum([3, 2, 4], 6)).toStrictEqual([1, 2]);
        expect(twoSum([3, 3], 6)).toStrictEqual([0, 1]);
    });
});
