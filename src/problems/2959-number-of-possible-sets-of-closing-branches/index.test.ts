import { describe, expect, it } from "bun:test";
import { numberOfPossibleSetsOfClosingBranches as numberOfSets } from ".";

describe("2959. Number of Possible Sets of Closing Branches", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfSets(3, 5, [
				[0, 1, 2],
				[1, 2, 10],
				[0, 2, 10],
			]),
		).toBe(5);
		expect(
			numberOfSets(3, 5, [
				[0, 1, 20],
				[0, 1, 10],
				[1, 2, 2],
				[0, 2, 2],
			]),
		).toBe(7);
		expect(numberOfSets(1, 10, [])).toBe(2);
	});
});
