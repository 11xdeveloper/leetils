import { describe, expect, it } from "bun:test";
import { minimumOperationsToCollectElements as minOperations } from ".";

describe("2869. Minimum Operations to Collect Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([3, 1, 5, 4, 2], 2)).toBe(4);
		expect(minOperations([3, 1, 5, 4, 2], 5)).toBe(5);
		expect(minOperations([3, 2, 5, 3, 1], 3)).toBe(4);
	});
});
