import { describe, expect, it } from "bun:test";
import { maximumNumberOfPairsInArray as numberOfPairs } from ".";

describe("2341. Maximum Number of Pairs in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfPairs([1, 3, 2, 1, 3, 2, 2])).toEqual([3, 1]);
		expect(numberOfPairs([1, 1])).toEqual([1, 0]);
		expect(numberOfPairs([0])).toEqual([0, 1]);
	});
});
