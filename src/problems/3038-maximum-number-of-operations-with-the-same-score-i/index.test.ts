import { describe, expect, it } from "bun:test";
import { maximumNumberOfOperationsWithTheSameScoreI as maxOperations } from ".";

describe("3038. Maximum Number of Operations With the Same Score I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxOperations([3, 2, 1, 4, 5])).toBe(2);
		expect(maxOperations([1, 5, 3, 3, 4, 1, 3, 2, 2, 3])).toBe(2);
		expect(maxOperations([5, 3])).toBe(1);
	});
});
