import { describe, expect, it } from "bun:test";
import { minimumPairRemovalToSortArrayI as minimumPairRemoval } from ".";

describe("3507. Minimum Pair Removal to Sort Array I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumPairRemoval([5, 2, 3, 1])).toBe(2);
		expect(minimumPairRemoval([1, 2, 2])).toBe(0);
	});
});
