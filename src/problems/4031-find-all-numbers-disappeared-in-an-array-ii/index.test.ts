import { describe, expect, it } from "bun:test";
import { findAllNumbersDisappearedInAnArrayII as findDisappearedNumbers } from ".";

describe("4031. Find All Numbers Disappeared in an Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(findDisappearedNumbers([3, 9, 7], 1, 12)).toEqual([
			[1, 2],
			[4, 6],
			[8, 8],
			[10, 12],
		]);
		expect(findDisappearedNumbers([1, 1], 5, 7)).toEqual([[5, 7]]);
		expect(findDisappearedNumbers([2, 3, 5], 2, 3)).toEqual([]);
	});
});
