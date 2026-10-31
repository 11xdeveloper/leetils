import { describe, expect, it } from "bun:test";
import { partitionArrayIntoTwoEqualProductSubsets as checkEqualPartitions } from ".";

describe("3566. Partition Array into Two Equal Product Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkEqualPartitions([3, 1, 6, 8, 4], 24)).toBeTrue();
		expect(checkEqualPartitions([2, 5, 3, 7], 15)).toBeFalse();
	});
});
