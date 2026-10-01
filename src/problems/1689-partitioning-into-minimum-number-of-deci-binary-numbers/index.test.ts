import { describe, expect, it } from "bun:test";
import { partitioningIntoMinimumNumberOfDeciBinaryNumbers as minPartitions } from ".";

describe("1689. Partitioning Into Minimum Number Of Deci-Binary Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(minPartitions("32")).toBe(3);
		expect(minPartitions("82734")).toBe(8);
		expect(minPartitions("27346209830709182346")).toBe(9);
	});
});
