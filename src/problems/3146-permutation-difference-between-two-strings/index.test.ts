import { describe, expect, it } from "bun:test";
import { permutationDifferenceBetweenTwoStrings as findPermutationDifference } from ".";

describe("3146. Permutation Difference between Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPermutationDifference("abc", "bac")).toBe(2);
		expect(findPermutationDifference("abcde", "edbac")).toBe(12);
	});
});
