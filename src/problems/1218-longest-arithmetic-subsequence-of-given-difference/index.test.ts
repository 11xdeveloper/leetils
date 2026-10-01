import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestArithmeticSubsequenceOfGivenDifference as longestSubsequence } from ".";

/** Quadratic dynamic programming over every earlier element. */
const byBruteForce = (arr: number[], difference: number): number => {
	const ending: number[] = [];
	arr.forEach((value, i) => {
		ending[i] = 1;
		for (let j = 0; j < i; j++) {
			if (value - (arr[j] ?? 0) === difference) {
				ending[i] = Math.max(ending[i] ?? 1, (ending[j] ?? 0) + 1);
			}
		}
	});
	return Math.max(...ending);
};

describe("1218. Longest Arithmetic Subsequence of Given Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubsequence([1, 2, 3, 4], 1)).toBe(4);
		expect(longestSubsequence([1, 3, 5, 7], 1)).toBe(1);
		expect(longestSubsequence([1, 5, 7, 8, 5, 3, 4, 2, 1], -2)).toBe(4);
	});

	it("handles a difference of 0", () => {
		expect(longestSubsequence([3, 1, 3, 3, 2], 0)).toBe(3);
	});

	it("matches quadratic dynamic programming on random inputs", () => {
		const random = createRandom(1218);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 15), -5, 5);
			const difference = random.int(-3, 3);
			expect(longestSubsequence(arr, difference)).toBe(
				byBruteForce(arr, difference),
			);
		}
	});
});
