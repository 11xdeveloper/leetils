import { describe, expect, it } from "bun:test";
import { sumOfValuesAtIndicesWithKSetBits as sumIndicesWithKSetBits } from ".";

describe("2859. Sum of Values at Indices With K Set Bits", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumIndicesWithKSetBits([5, 10, 1, 5, 2], 1)).toBe(13);
		expect(sumIndicesWithKSetBits([4, 3, 2, 1], 2)).toBe(1);
	});
});
