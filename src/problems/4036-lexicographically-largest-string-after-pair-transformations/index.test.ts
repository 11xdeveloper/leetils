import { describe, expect, it } from "bun:test";
import { lexicographicallyLargestStringAfterPairTransformations as largestString } from ".";

describe("4036. Lexicographically Largest String After Pair Transformations", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestString([2, 5, 7])).toEqual(["b", "ca", "cba"]);
		expect(largestString([3, 9, 1])).toEqual(["ba", "da", "a"]);
	});

	it("stops merging at z", () => {
		expect(largestString([2 ** 25 * 2 + 3])).toEqual(["zzba"]);
	});
});
