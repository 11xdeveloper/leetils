import { describe, expect, it } from "bun:test";
import { determineTheMinimumSumOfAKAvoidingArray as minimumSum } from ".";

describe("2829. Determine the Minimum Sum of a k-avoiding Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSum(5, 4)).toBe(18);
		expect(minimumSum(2, 6)).toBe(3);
	});

	it("matches greedily taking the smallest safe integers", () => {
		for (let n = 1; n <= 12; n++)
			for (let k = 1; k <= 15; k++) {
				const taken = new Set<number>();
				for (let x = 1; taken.size < n; x++)
					if (!taken.has(k - x)) taken.add(x);
				expect(minimumSum(n, k)).toBe([...taken].reduce((s, x) => s + x, 0));
			}
	});
});
