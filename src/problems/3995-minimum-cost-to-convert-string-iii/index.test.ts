import { describe, expect, it } from "bun:test";
import { minimumCostToConvertStringIII as minCost } from ".";

describe("3995. Minimum Cost to Convert String III", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minCost(
				"hello",
				"world",
				[
					["he", "wo"],
					["llo", "rld"],
				],
				[3, 4],
			),
		).toBe(7);
		expect(minCost("cat", "dog", [["c*t", "dog"]], [2])).toBe(3);
		expect(minCost("test", "next", [["*e*t", "next"]], [4])).toBe(6);
		expect(minCost("ab", "bc", [["a*", "bd"]], [9])).toBe(-1);
	});
});
