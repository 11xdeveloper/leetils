import { describe, expect, it } from "bun:test";
import { minimumNumberOfOperationsToMakeArraysSimilar as makeSimilar } from ".";

describe("2449. Minimum Number of Operations to Make Arrays Similar", () => {
	it("solves the examples from the problem statement", () => {
		expect(makeSimilar([8, 12, 6], [2, 14, 10])).toBe(2);
		expect(makeSimilar([1, 2, 5], [4, 1, 3])).toBe(1);
		expect(makeSimilar([1, 1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(0);
	});
});
