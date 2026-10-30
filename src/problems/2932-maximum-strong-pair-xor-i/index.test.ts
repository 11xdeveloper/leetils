import { describe, expect, it } from "bun:test";
import { maximumStrongPairXorI as maximumStrongPairXor } from ".";

describe("2932. Maximum Strong Pair XOR I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumStrongPairXor([1, 2, 3, 4, 5])).toBe(7);
		expect(maximumStrongPairXor([10, 100])).toBe(0);
		expect(maximumStrongPairXor([5, 6, 25, 30])).toBe(7);
	});
});
