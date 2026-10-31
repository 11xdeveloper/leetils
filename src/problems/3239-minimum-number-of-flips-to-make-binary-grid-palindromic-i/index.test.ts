import { describe, expect, it } from "bun:test";
import { minimumNumberOfFlipsToMakeBinaryGridPalindromicI as minFlips } from ".";

describe("3239. Minimum Number of Flips to Make Binary Grid Palindromic I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minFlips([
				[1, 0, 0],
				[0, 0, 0],
				[0, 0, 1],
			]),
		).toBe(2);
		expect(
			minFlips([
				[0, 1],
				[0, 1],
				[0, 0],
			]),
		).toBe(1);
		expect(minFlips([[1], [0]])).toBe(0);
	});
});
