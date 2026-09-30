import { describe, expect, it } from "bun:test";
import { peopleWhoseListOfFavoriteCompaniesIsNotASubsetOfAnotherList as peopleIndexes } from ".";

describe("1452. People Whose List of Favorite Companies Is Not a Subset of Another List", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			peopleIndexes([
				["leetcode", "google", "facebook"],
				["google", "microsoft"],
				["google", "facebook"],
				["google"],
				["amazon"],
			]),
		).toEqual([0, 1, 4]);
		expect(
			peopleIndexes([
				["leetcode", "google", "facebook"],
				["leetcode", "amazon"],
				["facebook", "google"],
			]),
		).toEqual([0, 1]);
		expect(
			peopleIndexes([["leetcode"], ["google"], ["facebook"], ["amazon"]]),
		).toEqual([0, 1, 2, 3]);
	});
});
