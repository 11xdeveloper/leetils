import { test, expect, describe } from "bun:test";
import { combinationSum } from ".";

describe("Combination Sum", () => {
	test(`Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

    The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`, () => {
		expect(combinationSum([2, 3, 6, 7], 7)).toStrictEqual([[2, 2, 3], [7]]);
		expect(combinationSum([2, 3, 5], 8)).toStrictEqual([
			[2, 2, 2, 2],
			[2, 3, 3],
			[3, 5],
		]);
		expect(combinationSum([2], 1)).toStrictEqual([]);
	});
});
