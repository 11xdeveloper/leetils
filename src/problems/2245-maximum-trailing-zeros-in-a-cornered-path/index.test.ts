import { describe, expect, it } from "bun:test";
import { maximumTrailingZerosInACorneredPath as maxTrailingZeros } from ".";

describe("2245. Maximum Trailing Zeros in a Cornered Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxTrailingZeros([
				[23, 17, 15, 3, 20],
				[8, 1, 20, 27, 11],
				[9, 4, 6, 2, 21],
				[40, 9, 1, 10, 6],
				[22, 7, 4, 5, 3],
			]),
		).toBe(3);
		expect(
			maxTrailingZeros([
				[4, 3, 2],
				[7, 6, 1],
				[8, 8, 8],
			]),
		).toBe(0);
	});

	it("handles straight paths", () => {
		expect(maxTrailingZeros([[2, 5, 10]])).toBe(2);
		expect(maxTrailingZeros([[2], [5], [10]])).toBe(2);
	});
});
