import { describe, expect, it } from "bun:test";
import { checkIfEveryRowAndColumnContainsAllNumbers as checkValid } from ".";

describe("2133. Check if Every Row and Column Contains All Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkValid([
				[1, 2, 3],
				[3, 1, 2],
				[2, 3, 1],
			]),
		).toBeTrue();
		expect(
			checkValid([
				[1, 1, 1],
				[1, 2, 3],
				[1, 2, 3],
			]),
		).toBeFalse();
	});
});
