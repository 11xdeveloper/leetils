import { describe, expect, it } from "bun:test";
import { checkIfArrayIsGood as isGood } from ".";

describe("2784. Check if Array is Good", () => {
	it("solves the examples from the problem statement", () => {
		expect(isGood([2, 1, 3])).toBe(false);
		expect(isGood([1, 3, 3, 2])).toBe(true);
		expect(isGood([1, 1])).toBe(true);
		expect(isGood([3, 4, 4, 1, 2, 1])).toBe(false);
	});
});
