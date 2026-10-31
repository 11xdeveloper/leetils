import { describe, expect, it } from "bun:test";
import { partitionArraySuchThatMaximumDifferenceIsK as partitionArray } from ".";

describe("2294. Partition Array Such That Maximum Difference Is K", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionArray([3, 6, 1, 2, 5], 2)).toBe(2);
		expect(partitionArray([1, 2, 3], 1)).toBe(2);
		expect(partitionArray([2, 2, 4, 5], 0)).toBe(3);
	});
});
