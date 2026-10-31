import { describe, expect, it } from "bun:test";
import { countEqualAndDivisiblePairsInAnArray as countPairs } from ".";

describe("2176. Count Equal and Divisible Pairs in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPairs([3, 1, 2, 2, 2, 1, 3], 2)).toBe(4);
		expect(countPairs([1, 2, 3, 4], 1)).toBe(0);
	});
});
