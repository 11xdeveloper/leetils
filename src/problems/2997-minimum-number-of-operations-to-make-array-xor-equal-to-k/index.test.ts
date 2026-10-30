import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeArrayXorEqualToK as minOperations } from ".";

describe("2997. Minimum Number of Operations to Make Array XOR Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 1, 3, 4], 1)).toBe(2);
		expect(minOperations([2, 0, 2, 0], 0)).toBe(0);
	});
});
