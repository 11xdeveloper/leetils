import { describe, expect, it } from "bun:test";
import { minimumCostToConvertStringII as minimumCost } from ".";

describe("2977. Minimum Cost to Convert String II", () => {
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
		expect(
			minimumCost(
				"abcdefgh",
				"acdeeghh",
				["bcd", "fgh", "thh"],
				["cde", "thh", "ghh"],
				[1, 3, 5],
			),
		).toBe(9);
		expect(
			minimumCost(
				"abcdefgh",
				"addddddd",
				["bcd", "defgh"],
				["ddd", "ddddd"],
				[100, 1578],
			),
		).toBe(-1);
	});
});
