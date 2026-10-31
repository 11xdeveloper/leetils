import { describe, expect, it } from "bun:test";
import { minimumCostToPartitionABinaryString as minCost } from ".";

describe("3864. Minimum Cost to Partition a Binary String", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost("1010", 2, 1)).toBe(6);
		expect(minCost("1010", 3, 10)).toBe(12);
		expect(minCost("00", 1, 2)).toBe(2);
	});
});
