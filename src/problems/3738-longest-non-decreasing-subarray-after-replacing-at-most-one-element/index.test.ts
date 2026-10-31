import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestNonDecreasingSubarrayAfterReplacingAtMostOneElement as longestSubarray } from ".";

/** Tries every replacement with a useful value. */
const byBruteForce = (nums: number[]): number => {
	const longest = (arr: number[]) => {
		let [best, run] = [0, 0];
		arr.forEach((x, i) => {
			run = i > 0 && (arr[i - 1] ?? 0) <= x ? run + 1 : 1;
			best = Math.max(best, run);
		});
		return best;
	};
	let best = longest(nums);
	for (let i = 0; i < nums.length; i++)
		for (const v of [...nums, -100, 100])
			best = Math.max(best, longest(nums.map((x, j) => (j === i ? v : x))));
	return best;
};

describe("3738. Longest Non-Decreasing Subarray After Replacing at Most One Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([1, 2, 3, 1, 2])).toBe(4);
		expect(longestSubarray([2, 2, 2, 2, 2])).toBe(5);
	});

	it("matches trying every replacement on random arrays", () => {
		const random = createRandom(3738);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 6);
			expect(longestSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
