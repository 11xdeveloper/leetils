import { describe, expect, it } from "bun:test";
import { maximumXorForEachQuery as getMaximumXor } from ".";

describe("1829. Maximum XOR for Each Query", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaximumXor([0, 1, 1, 3], 2)).toEqual([0, 3, 2, 3]);
		expect(getMaximumXor([2, 3, 4, 7], 3)).toEqual([5, 2, 6, 5]);
		expect(getMaximumXor([0, 1, 2, 2, 5, 7], 3)).toEqual([4, 3, 6, 4, 6, 7]);
	});
});
