import { describe, expect, it } from "bun:test";
import { mostFrequentNumberFollowingKeyInAnArray as mostFrequent } from ".";

describe("2190. Most Frequent Number Following Key In an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(mostFrequent([1, 100, 200, 1, 100], 1)).toBe(100);
		expect(mostFrequent([2, 2, 2, 2, 3], 2)).toBe(2);
	});
});
