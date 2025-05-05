import { test, expect, describe } from "bun:test";
import { plusOne } from ".";

describe("Plus One", () => {
	test(`You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

    Increment the large integer by one and return the resulting array of digits.`, () => {
		expect(plusOne([1, 2, 3])).toStrictEqual([1, 2, 4]);
		expect(plusOne([4, 3, 2, 1])).toStrictEqual([4, 3, 2, 2]);
		expect(plusOne([9])).toStrictEqual([1, 0]);
	});
});
