import { describe, expect, it } from "bun:test";
import { makeLexicographicallySmallestArrayBySwappingElements as lexicographicallySmallestArray } from ".";

describe("2948. Make Lexicographically Smallest Array by Swapping Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexicographicallySmallestArray([1, 5, 3, 9, 8], 2)).toEqual([
			1, 3, 5, 8, 9,
		]);
		expect(lexicographicallySmallestArray([1, 7, 6, 18, 2, 1], 3)).toEqual([
			1, 6, 7, 18, 1, 2,
		]);
		expect(lexicographicallySmallestArray([1, 7, 28, 19, 10], 3)).toEqual([
			1, 7, 28, 19, 10,
		]);
	});
});
