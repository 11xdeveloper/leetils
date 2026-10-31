import { describe, expect, it } from "bun:test";
import { minimumOperationsToHalveArraySum as halveArray } from ".";

describe("2208. Minimum Operations to Halve Array Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(halveArray([5, 19, 8, 1])).toBe(3);
		expect(halveArray([3, 8, 20])).toBe(3);
	});

	it("halves a single number once", () => {
		expect(halveArray([7])).toBe(1);
	});
});
