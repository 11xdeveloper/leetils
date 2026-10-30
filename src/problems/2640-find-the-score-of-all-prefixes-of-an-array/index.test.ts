import { describe, expect, it } from "bun:test";
import { findTheScoreOfAllPrefixesOfAnArray as findPrefixScore } from ".";

describe("2640. Find the Score of All Prefixes of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPrefixScore([2, 3, 7, 5, 10])).toEqual([4, 10, 24, 36, 56]);
		expect(findPrefixScore([1, 1, 2, 4, 8, 16])).toEqual([2, 4, 8, 16, 32, 64]);
	});
});
