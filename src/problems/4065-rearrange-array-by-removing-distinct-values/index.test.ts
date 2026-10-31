import { describe, expect, it } from "bun:test";
import { rearrangeArrayByRemovingDistinctValues as rearrangeArray } from ".";

describe("4065. Rearrange Array by Removing Distinct Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeArray([3, 1, 3, 2, 1, 3])).toEqual([1, 2, 3, 1, 3, 3]);
		expect(rearrangeArray([7, 7, 4, 4, 4])).toEqual([4, 7, 4, 7, 4]);
	});
});
