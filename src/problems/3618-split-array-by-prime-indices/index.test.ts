import { describe, expect, it } from "bun:test";
import { splitArrayByPrimeIndices as splitArray } from ".";

describe("3618. Split Array by Prime Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitArray([2, 3, 4])).toBe(1);
		expect(splitArray([-1, 5, 7, 0])).toBe(3);
	});

	it("uses every prime index", () => {
		expect(splitArray([0, 0, 1, 1, 0, 1, 0, 1, 0, 0])).toBe(4);
	});
});
