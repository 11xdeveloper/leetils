import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { slidingWindowMedian as medianSlidingWindow } from ".";

const bySorting = (nums: number[], k: number): number[] =>
	Array.from({ length: nums.length - k + 1 }, (_, i) => {
		const window = nums.slice(i, i + k).sort((a, b) => a - b);
		return k % 2 === 1
			? (window[(k - 1) / 2] ?? 0)
			: ((window[k / 2 - 1] ?? 0) + (window[k / 2] ?? 0)) / 2;
	});

describe("480. Sliding Window Median", () => {
	it("solves the examples from the problem statement", () => {
		expect(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([
			1, -1, -1, 3, 5, 6,
		]);
		expect(medianSlidingWindow([1, 2, 3, 4, 2, 3, 1, 4, 2], 3)).toEqual([
			2, 3, 3, 3, 2, 3, 2,
		]);
	});

	it("averages the extremes of the 32-bit range without overflow", () => {
		expect(medianSlidingWindow([2 ** 31 - 1, 2 ** 31 - 1], 2)).toEqual([
			2 ** 31 - 1,
		]);
		expect(medianSlidingWindow([-(2 ** 31), 2 ** 31 - 1], 2)).toEqual([-0.5]);
	});

	it("matches sorting every window on random inputs", () => {
		const random = createRandom(480);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 30), -5, 5);
			const k = random.int(1, nums.length);
			expect(medianSlidingWindow(nums, k)).toEqual(bySorting(nums, k));
		}
	});
});
