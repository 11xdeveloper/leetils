import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToHaveDistinctElements as minOperations } from ".";

describe("3779. Minimum Number of Operations to Have Distinct Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 8, 3, 6, 5, 8])).toBe(1);
		expect(minOperations([2, 2])).toBe(1);
		expect(minOperations([4, 3, 5, 1, 2])).toBe(0);
	});
});
