import { describe, expect, it } from "bun:test";
import { partitionArrayIntoKDistinctGroups as partitionArray } from ".";

describe("3659. Partition Array Into K-Distinct Groups", () => {
	it("solves the examples from the problem statement", () => {
		expect(partitionArray([1, 2, 3, 4], 2)).toBeTrue();
		expect(partitionArray([3, 5, 2, 2], 2)).toBeTrue();
		expect(partitionArray([1, 5, 2, 3], 3)).toBeFalse();
	});

	it("rejects a value too frequent to spread out", () => {
		expect(partitionArray([1, 1, 1, 2], 2)).toBeFalse();
	});
});
