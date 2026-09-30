import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubarrayOf1sAfterDeletingOneElement as longestSubarray } from ".";

/** Deletes each element in turn and measures the longest run of 1s. */
const byBruteForce = (nums: number[]): number =>
	Math.max(
		...nums.map((_, i) => {
			const rest = nums.filter((__, j) => j !== i).join("");
			return Math.max(0, ...(rest.match(/1+/g) ?? []).map((run) => run.length));
		}),
	);

describe("1493. Longest Subarray of 1's After Deleting One Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSubarray([1, 1, 0, 1])).toBe(3);
		expect(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])).toBe(5);
		expect(longestSubarray([1, 1, 1])).toBe(2);
	});

	it("matches deleting each element on random inputs", () => {
		const random = createRandom(1493);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 1);
			expect(longestSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
