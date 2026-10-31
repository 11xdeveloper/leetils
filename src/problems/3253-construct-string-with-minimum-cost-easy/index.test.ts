import { describe, expect, it } from "bun:test";
import { constructStringWithMinimumCostEasy as minimumCost } from ".";

describe("3253. Construct String with Minimum Cost (Easy)", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumCost(
				"abcdef",
				["abdef", "abc", "d", "def", "ef"],
				[100, 1, 1, 10, 5],
			),
		).toBe(7);
		expect(minimumCost("aaaa", ["z", "zz", "zzz"], [1, 10, 100])).toBe(-1);
	});
});
