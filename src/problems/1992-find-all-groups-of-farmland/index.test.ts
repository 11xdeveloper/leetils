import { describe, expect, it } from "bun:test";
import { findAllGroupsOfFarmland as findFarmland } from ".";

describe("1992. Find All Groups of Farmland", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findFarmland([
				[1, 0, 0],
				[0, 1, 1],
				[0, 1, 1],
			]),
		).toEqual([
			[0, 0, 0, 0],
			[1, 1, 2, 2],
		]);
		expect(
			findFarmland([
				[1, 1],
				[1, 1],
			]),
		).toEqual([[0, 0, 1, 1]]);
		expect(findFarmland([[0]])).toEqual([]);
	});
});
