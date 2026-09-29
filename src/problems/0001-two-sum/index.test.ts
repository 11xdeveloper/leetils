import { describe, expect, it } from "bun:test";
import { twoSum } from ".";

describe("1. Two Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
		expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
		expect(twoSum([3, 3], 6)).toEqual([0, 1]);
	});

	it("does not use the same element twice", () => {
		expect(twoSum([3, 2, 4], 6)).not.toEqual([0, 0]);
		expect(twoSum([5, 1, 5], 10)).toEqual([0, 2]);
	});

	it("handles negative numbers and zero", () => {
		expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
		expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
		expect(twoSum([0, 4, 3, 0], 0)).toEqual([0, 3]);
	});

	it("finds pairs at either end of the array", () => {
		expect(twoSum([1, 2, 3, 4, 5], 3)).toEqual([0, 1]);
		expect(twoSum([1, 2, 3, 4, 5], 9)).toEqual([3, 4]);
	});

	it("handles values at the limits of the constraints", () => {
		expect(twoSum([1e9, -1e9, 5], 0)).toEqual([0, 1]);
	});
});
