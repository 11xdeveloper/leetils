import { describe, expect, it } from "bun:test";
import { minimumCostToConvertStringI as minimumCost } from ".";

describe("2976. Minimum Cost to Convert String I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				"abcd",
				"acbe",
				["a", "b", "c", "c", "e", "d"],
				["b", "c", "b", "e", "b", "e"],
				[2, 5, 5, 1, 2, 20],
			),
		).toBe(28);
		expect(minimumCost("aaaa", "bbbb", ["a", "c"], ["c", "b"], [1, 2])).toBe(
			12,
		);
		expect(minimumCost("abcd", "abce", ["a"], ["e"], [10000])).toBe(-1);
	});
});
