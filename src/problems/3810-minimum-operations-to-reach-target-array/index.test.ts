import { describe, expect, it } from "bun:test";
import { minimumOperationsToReachTargetArray as minOperations } from ".";

describe("3810. Minimum Operations to Reach Target Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 3], [2, 1, 3])).toBe(2);
		expect(minOperations([4, 1, 4], [5, 1, 4])).toBe(1);
		expect(minOperations([7, 3, 7], [5, 5, 9])).toBe(2);
	});
});
