import { describe, expect, it } from "bun:test";
import { countNumberOfDistinctIntegersAfterReverseOperations as countDistinctIntegers } from ".";

describe("2442. Count Number of Distinct Integers After Reverse Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDistinctIntegers([1, 13, 10, 12, 31])).toBe(6);
		expect(countDistinctIntegers([2, 2, 2])).toBe(1);
	});
});
