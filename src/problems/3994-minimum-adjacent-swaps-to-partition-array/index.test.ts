import { describe, expect, it } from "bun:test";
import { minimumAdjacentSwapsToPartitionArray as minAdjacentSwaps } from ".";

describe("3994. Minimum Adjacent Swaps to Partition Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAdjacentSwaps([1, 3, 2, 4, 5, 6], 3, 4)).toBe(1);
		expect(minAdjacentSwaps([9, 7, 5, 3], 4, 8)).toBe(5);
		expect(minAdjacentSwaps([3, 7, 5, 9], 4, 8)).toBe(0);
	});
});
