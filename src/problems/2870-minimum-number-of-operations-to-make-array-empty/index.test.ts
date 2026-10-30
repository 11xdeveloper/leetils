import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeArrayEmpty as minOperations } from ".";

describe("2870. Minimum Number of Operations to Make Array Empty", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([2, 3, 3, 2, 2, 4, 2, 3, 4])).toBe(4);
		expect(minOperations([2, 1, 2, 2, 3, 3])).toBe(-1);
	});
});
