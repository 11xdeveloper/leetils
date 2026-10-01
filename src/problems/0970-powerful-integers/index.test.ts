import { describe, expect, it } from "bun:test";
import { powerfulIntegers } from ".";

describe("970. Powerful Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(powerfulIntegers(2, 3, 10)).toEqual([2, 3, 4, 5, 7, 9, 10]);
		expect(powerfulIntegers(3, 5, 15)).toEqual([2, 4, 6, 8, 10, 14]);
	});

	it("handles bases of 1 and tiny bounds", () => {
		expect(powerfulIntegers(1, 1, 5)).toEqual([2]);
		expect(powerfulIntegers(1, 2, 10)).toEqual([2, 3, 5, 9]);
		expect(powerfulIntegers(2, 2, 1)).toEqual([]);
	});
});
