import { describe, expect, it } from "bun:test";
import { minimumOperationsToConvertNumber as minimumOperations } from ".";

describe("2059. Minimum Operations to Convert Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumOperations([2, 4, 12], 2, 12)).toBe(2);
		expect(minimumOperations([3, 5, 7], 0, -4)).toBe(2);
		expect(minimumOperations([2, 8, 16], 0, 1)).toBe(-1);
	});

	it("can't continue from outside the range", () => {
		// 1000 + 500 is out of range, so 2000 can't be reached that way.
		expect(minimumOperations([500], 1000, 2000)).toBe(-1);
		expect(minimumOperations([500], 1000, 1500)).toBe(1);
	});
});
