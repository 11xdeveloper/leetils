import { describe, expect, it } from "bun:test";
import { countIntegersAppearingInASingleBlock as countSpecialIntegers } from ".";

describe("4038. Count Integers Appearing in a Single Block", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSpecialIntegers([1, 2, 2, 1])).toBe(1);
		expect(countSpecialIntegers([3, 3, 1, 2, 2, 1])).toBe(2);
	});
});
