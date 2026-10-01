import { describe, expect, it } from "bun:test";
import { sumOfUniqueElements as sumOfUnique } from ".";

describe("1748. Sum of Unique Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfUnique([1, 2, 3, 2])).toBe(4);
		expect(sumOfUnique([1, 1, 1, 1, 1])).toBe(0);
		expect(sumOfUnique([1, 2, 3, 4, 5])).toBe(15);
	});
});
