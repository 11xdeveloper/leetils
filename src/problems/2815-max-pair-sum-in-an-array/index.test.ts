import { describe, expect, it } from "bun:test";
import { maxPairSumInAnArray as maxSum } from ".";

describe("2815. Max Pair Sum in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([51, 71, 17, 24, 42])).toBe(88);
		expect(maxSum([1, 2, 3, 4])).toBe(-1);
	});
});
