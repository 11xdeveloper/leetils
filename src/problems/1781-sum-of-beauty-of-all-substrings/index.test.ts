import { describe, expect, it } from "bun:test";
import { sumOfBeautyOfAllSubstrings as beautySum } from ".";

describe("1781. Sum of Beauty of All Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautySum("aabcb")).toBe(5);
		expect(beautySum("aabcbaa")).toBe(17);
	});

	it("returns 0 for a single letter", () => {
		expect(beautySum("zzzz")).toBe(0);
	});
});
