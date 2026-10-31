import { describe, expect, it } from "bun:test";
import { numberOfSubstringsWithFixedRatio as fixedRatio } from ".";

describe("2489. Number of Substrings With Fixed Ratio", () => {
	it("solves the examples from the problem statement", () => {
		expect(fixedRatio("0110011", 1, 2)).toBe(4);
		expect(fixedRatio("10101", 3, 1)).toBe(0);
	});
});
