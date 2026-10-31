import { describe, expect, it } from "bun:test";
import { largestIntegerWithGivenDigitSum as largestInteger } from ".";

describe("4000. Largest Integer With Given Digit Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestInteger(2, 9)).toBe(90);
		expect(largestInteger(2, 19)).toBe(-1);
		expect(largestInteger(5, 0)).toBe(0);
	});
});
