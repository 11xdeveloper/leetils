import { describe, expect, it } from "bun:test";
import { countTripletsWithEvenXorSetBitsI as tripletCount } from ".";

describe("3199. Count Triplets with Even XOR Set Bits I", () => {
	it("solves the examples from the problem statement", () => {
		expect(tripletCount([1], [2], [3])).toBe(1);
		expect(tripletCount([1, 1], [2, 3], [1, 5])).toBe(4);
	});
});
