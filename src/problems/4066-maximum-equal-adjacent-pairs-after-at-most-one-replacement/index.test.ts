import { describe, expect, it } from "bun:test";
import { maximumEqualAdjacentPairsAfterAtMostOneReplacement as maxEqualAdjacentPairs } from ".";

describe("4066. Maximum Equal Adjacent Pairs After at Most One Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxEqualAdjacentPairs([1, 2, 3, 2])).toBe(2);
		expect(maxEqualAdjacentPairs([1, 2, 1, 2, 1])).toBe(4);
		expect(maxEqualAdjacentPairs([1, 1, 1])).toBe(2);
	});
});
