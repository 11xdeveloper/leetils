import { describe, expect, it } from "bun:test";
import { smallestPairWithDifferentFrequencies as minDistinctFreqPair } from ".";

describe("3852. Smallest Pair With Different Frequencies", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDistinctFreqPair([1, 1, 2, 2, 3, 4])).toEqual([1, 3]);
		expect(minDistinctFreqPair([1, 5])).toEqual([-1, -1]);
		expect(minDistinctFreqPair([7])).toEqual([-1, -1]);
	});
});
