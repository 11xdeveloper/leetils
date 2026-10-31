import { describe, expect, it } from "bun:test";
import { maximumNumberOfDistinctElementsAfterOperations as maxDistinctElements } from ".";

describe("3397. Maximum Number of Distinct Elements After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistinctElements([1, 2, 2, 3, 3, 4], 2)).toBe(6);
		expect(maxDistinctElements([4, 4, 4, 4], 1)).toBe(3);
	});
});
