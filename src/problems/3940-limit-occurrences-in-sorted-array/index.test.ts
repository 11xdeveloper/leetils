import { describe, expect, it } from "bun:test";
import { limitOccurrencesInSortedArray as limitOccurrences } from ".";

describe("3940. Limit Occurrences in Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(limitOccurrences([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 1, 2, 2, 3]);
		expect(limitOccurrences([1, 2, 3], 1)).toEqual([1, 2, 3]);
	});
});
