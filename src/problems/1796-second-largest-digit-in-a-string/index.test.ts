import { describe, expect, it } from "bun:test";
import { secondLargestDigitInAString as secondHighest } from ".";

describe("1796. Second Largest Digit in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(secondHighest("dfa12321afd")).toBe(2);
		expect(secondHighest("abc1111")).toBe(-1);
	});

	it("handles strings without digits", () => {
		expect(secondHighest("abc")).toBe(-1);
	});
});
