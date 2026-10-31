import { describe, expect, it } from "bun:test";
import { smallestMissingNonNegativeIntegerAfterOperations as findSmallestInteger } from ".";

describe("2598. Smallest Missing Non-negative Integer After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSmallestInteger([1, -10, 7, 13, 6, 8], 5)).toBe(4);
		expect(findSmallestInteger([1, -10, 7, 13, 6, 8], 7)).toBe(2);
	});
});
