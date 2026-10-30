import { describe, expect, it } from "bun:test";
import { minimumArrayLengthAfterPairRemovals as minLengthAfterRemovals } from ".";

describe("2856. Minimum Array Length After Pair Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLengthAfterRemovals([1, 2, 3, 4])).toBe(0);
		expect(minLengthAfterRemovals([1, 1, 2, 2, 3, 3])).toBe(0);
		expect(minLengthAfterRemovals([1000000000, 1000000000])).toBe(2);
		expect(minLengthAfterRemovals([2, 3, 4, 4, 4])).toBe(1);
	});
});
