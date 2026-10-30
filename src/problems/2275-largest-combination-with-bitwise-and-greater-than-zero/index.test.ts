import { describe, expect, it } from "bun:test";
import { largestCombinationWithBitwiseAndGreaterThanZero as largestCombination } from ".";

describe("2275. Largest Combination With Bitwise AND Greater Than Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestCombination([16, 17, 71, 62, 12, 24, 14])).toBe(4);
		expect(largestCombination([8, 8])).toBe(2);
	});
});
