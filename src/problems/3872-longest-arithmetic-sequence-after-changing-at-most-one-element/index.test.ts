import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestArithmeticSequenceAfterChangingAtMostOneElement as longestArithmetic } from ".";

/** Tries every replacement within a generous range. */
const byBruteForce = (nums: number[]): number => {
	const longest = (arr: number[]) => {
		let [best, run] = [2, 2];
		for (let i = 2; i < arr.length; i++) {
			run =
				(arr[i] ?? 0) - (arr[i - 1] ?? 0) ===
				(arr[i - 1] ?? 0) - (arr[i - 2] ?? 0)
					? run + 1
					: 2;
			best = Math.max(best, run);
		}
		return best;
	};
	let best = longest(nums);
	for (let i = 0; i < nums.length; i++)
		for (let v = -30; v <= 40; v++)
			best = Math.max(best, longest(nums.map((x, j) => (j === i ? v : x))));
	return best;
};

describe("3872. Longest Arithmetic Sequence After Changing At Most One Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestArithmetic([9, 7, 5, 10, 1])).toBe(5);
		expect(longestArithmetic([1, 2, 6, 7])).toBe(3);
	});

	it("matches trying every replacement on random arrays", () => {
		const random = createRandom(3872);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(4, 9), 1, 10);
			expect(longestArithmetic(nums)).toBe(byBruteForce(nums));
		}
	});
});
