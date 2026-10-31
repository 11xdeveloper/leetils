import { describe, expect, it } from "bun:test";
import { minimumTotalOperations as minOperations } from ".";

describe("3353. Minimum Total Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 4, 2])).toBe(2);
		expect(minOperations([10, 10, 10])).toBe(0);
	});
});
