import { describe, expect, it } from "bun:test";
import { nextGreaterNumericallyBalancedNumber as nextBeautifulNumber } from ".";

describe("2048. Next Greater Numerically Balanced Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextBeautifulNumber(1)).toBe(22);
		expect(nextBeautifulNumber(1000)).toBe(1333);
		expect(nextBeautifulNumber(3000)).toBe(3133);
	});

	it("handles the bounds", () => {
		expect(nextBeautifulNumber(0)).toBe(1);
		expect(nextBeautifulNumber(1_000_000)).toBe(1_224_444);
	});
});
