import { describe, expect, it } from "bun:test";
import { beautifulArray } from ".";

const isBeautiful = (nums: number[]): boolean => {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 2; j < nums.length; j++) {
			for (let k = i + 1; k < j; k++)
				if (2 * (nums[k] ?? 0) === (nums[i] ?? 0) + (nums[j] ?? 0))
					return false;
		}
	}
	return true;
};

describe("932. Beautiful Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(isBeautiful(beautifulArray(4))).toBeTrue();
		expect(isBeautiful(beautifulArray(5))).toBeTrue();
	});

	it("gives a beautiful permutation for every n up to 60", () => {
		for (let n = 1; n <= 60; n++) {
			const result = beautifulArray(n);
			expect(result.toSorted((a, b) => a - b)).toEqual(
				Array.from({ length: n }, (_, i) => i + 1),
			);
			expect(isBeautiful(result)).toBeTrue();
		}
	});
});
