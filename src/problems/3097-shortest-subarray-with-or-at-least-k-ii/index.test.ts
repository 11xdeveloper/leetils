import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestSubarrayWithOrAtLeastKII as minimumSubarrayLength } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = -1;
	for (let i = 0; i < nums.length; i++) {
		let or = 0;
		for (let j = i; j < nums.length; j++) {
			or |= nums[j] ?? 0;
			if (or >= k) {
				if (best === -1 || j - i + 1 < best) best = j - i + 1;
				break;
			}
		}
	}
	return best;
};

describe("3097. Shortest Subarray With OR at Least K II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSubarrayLength([1, 2, 3], 2)).toBe(1);
		expect(minimumSubarrayLength([2, 1, 8], 10)).toBe(3);
		expect(minimumSubarrayLength([1, 2], 0)).toBe(1);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3097);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 20);
			const k = random.int(0, 40);
			expect(minimumSubarrayLength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
