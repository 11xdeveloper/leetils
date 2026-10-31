import { describe, expect, it } from "bun:test";
import { countPartitionsWithEvenSumDifference as countPartitions } from ".";

describe("3432. Count Partitions with Even Sum Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPartitions([10, 10, 3, 7, 6])).toBe(4);
		expect(countPartitions([1, 2, 2])).toBe(0);
		expect(countPartitions([2, 4, 6, 8])).toBe(3);
	});
});
