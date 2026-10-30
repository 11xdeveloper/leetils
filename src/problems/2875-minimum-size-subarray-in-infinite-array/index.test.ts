import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSizeSubarrayInInfiniteArray as minSizeSubarray } from ".";

/** Checks every start position over enough copies. */
const byBruteForce = (nums: number[], target: number): number => {
	const n = nums.length;
	let best = -1;
	for (let start = 0; start < n; start++) {
		let sum = 0;
		for (let length = 1; sum < target; length++) {
			sum += nums[(start + length - 1) % n] ?? 0;
			if (sum === target && (best === -1 || length < best)) best = length;
		}
	}
	return best;
};

describe("2875. Minimum Size Subarray in Infinite Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSizeSubarray([1, 2, 3], 5)).toBe(2);
		expect(minSizeSubarray([1, 1, 1, 2, 3], 4)).toBe(2);
		expect(minSizeSubarray([2, 4, 6, 8], 3)).toBe(-1);
	});

	it("matches checking every start on random inputs", () => {
		const random = createRandom(2875);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 6), 1, 5);
			const target = random.int(1, 40);
			expect(minSizeSubarray(nums, target)).toBe(byBruteForce(nums, target));
		}
	});
});
