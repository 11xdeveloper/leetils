import { describe, expect, it } from "bun:test";
import { minimumDeletionCostToMakeAllCharactersEqual as minCost } from ".";

describe("3784. Minimum Deletion Cost to Make All Characters Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minCost("aabaac", [1, 2, 3, 4, 1, 10])).toBe(11);
		expect(minCost("abc", [10, 5, 8])).toBe(13);
		expect(minCost("zzzzz", [67, 67, 67, 67, 67])).toBe(0);
	});
});
