import { describe, expect, it } from "bun:test";
import { divideAnArrayIntoSubarraysWithMinimumCostI as minimumCost } from ".";

describe("3010. Divide an Array Into Subarrays With Minimum Cost I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumCost([1, 2, 3, 12])).toBe(6);
		expect(minimumCost([5, 4, 3])).toBe(12);
		expect(minimumCost([10, 3, 1, 1])).toBe(12);
	});
});
