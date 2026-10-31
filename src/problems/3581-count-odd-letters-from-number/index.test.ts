import { describe, expect, it } from "bun:test";
import { countOddLettersFromNumber as countOddLetters } from ".";

describe("3581. Count Odd Letters from Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOddLetters(41)).toBe(5);
		expect(countOddLetters(20)).toBe(5);
	});

	it("cancels letters that appear twice", () => {
		expect(countOddLetters(11)).toBe(0);
	});
});
