import { describe, expect, it } from "bun:test";
import { sumOfGoodNumbers } from ".";

describe("3452. Sum of Good Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfGoodNumbers([1, 3, 2, 1, 5, 4], 2)).toBe(12);
		expect(sumOfGoodNumbers([2, 1], 1)).toBe(2);
	});
});
