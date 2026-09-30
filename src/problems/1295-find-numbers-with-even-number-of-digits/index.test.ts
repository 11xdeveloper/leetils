import { describe, expect, it } from "bun:test";
import { findNumbersWithEvenNumberOfDigits as findNumbers } from ".";

describe("1295. Find Numbers with Even Number of Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(findNumbers([12, 345, 2, 6, 7896])).toBe(2);
		expect(findNumbers([555, 901, 482, 1771])).toBe(1);
	});

	it("counts across digit boundaries", () => {
		expect(findNumbers([9, 10, 99, 100, 9999, 10000, 100000])).toBe(4);
	});
});
