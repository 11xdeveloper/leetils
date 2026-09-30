import { describe, expect, it } from "bun:test";
import { runningSumOf1dArray as runningSum } from ".";

describe("1480. Running Sum of 1d Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(runningSum([1, 2, 3, 4])).toEqual([1, 3, 6, 10]);
		expect(runningSum([1, 1, 1, 1, 1])).toEqual([1, 2, 3, 4, 5]);
		expect(runningSum([3, 1, 2, 10, 1])).toEqual([3, 4, 6, 16, 17]);
	});

	it("doesn't change its input", () => {
		const nums = [1, 2];
		runningSum(nums);
		expect(nums).toEqual([1, 2]);
	});
});
