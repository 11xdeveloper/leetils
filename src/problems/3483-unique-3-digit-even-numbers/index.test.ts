import { describe, expect, it } from "bun:test";
import { unique3DigitEvenNumbers as totalNumbers } from ".";

describe("3483. Unique 3-Digit Even Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(totalNumbers([1, 2, 3, 4])).toBe(12);
		expect(totalNumbers([0, 2, 2])).toBe(2);
		expect(totalNumbers([6, 6, 6])).toBe(1);
		expect(totalNumbers([1, 3, 5])).toBe(0);
	});
});
