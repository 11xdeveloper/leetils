import { describe, expect, it } from "bun:test";
import { maximumValidPairSum as maxValidPairSum } from ".";

describe("3979. Maximum Valid Pair Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxValidPairSum([1, 3, 5, 2, 8], 2)).toBe(13);
		expect(maxValidPairSum([5, 1, 9], 1)).toBe(14);
	});
});
