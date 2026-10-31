import { describe, expect, it } from "bun:test";
import { minimumDeletionsToMakeArrayDivisible as minOperations } from ".";

describe("2344. Minimum Deletions to Make Array Divisible", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 3, 2, 4, 3], [9, 6, 9, 3, 15])).toBe(2);
		expect(minOperations([4, 3, 6], [8, 2, 6, 10])).toBe(-1);
	});
});
