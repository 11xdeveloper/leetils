import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeColumnsStrictlyIncreasing as minimumOperations } from ".";

describe("3402. Minimum Operations to Make Columns Strictly Increasing", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOperations([
				[3, 2],
				[1, 3],
				[3, 4],
				[0, 1],
			]),
		).toBe(15);
		expect(
			minimumOperations([
				[3, 2, 1],
				[2, 1, 0],
				[1, 2, 3],
			]),
		).toBe(12);
	});
});
