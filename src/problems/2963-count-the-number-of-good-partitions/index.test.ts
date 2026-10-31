import { describe, expect, it } from "bun:test";
import { countTheNumberOfGoodPartitions as numberOfGoodPartitions } from ".";

describe("2963. Count the Number of Good Partitions", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfGoodPartitions([1, 2, 3, 4])).toBe(8);
		expect(numberOfGoodPartitions([1, 1, 1, 1])).toBe(1);
		expect(numberOfGoodPartitions([1, 2, 1, 3])).toBe(2);
	});
});
