import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findThePowerOfKSizeSubarraysII as resultsArray } from ".";

describe("3255. Find the Power of K-Size Subarrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(resultsArray([1, 2, 3, 4, 3, 2, 5], 3)).toEqual([3, 4, -1, -1, -1]);
		expect(resultsArray([2, 2, 2, 2, 2], 4)).toEqual([-1, -1]);
		expect(resultsArray([3, 2, 3, 2, 3, 2], 2)).toEqual([-1, 3, -1, 3, -1]);
	});

	it("matches checking every window on random arrays", () => {
		const random = createRandom(3255);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 5);
			const k = random.int(1, nums.length);
			const expected = nums.slice(0, nums.length - k + 1).map((_, i) => {
				const window = nums.slice(i, i + k);
				return window.every((v, j) => j === 0 || v === (window[j - 1] ?? 0) + 1)
					? (window.at(-1) ?? 0)
					: -1;
			});
			expect(resultsArray(nums, k)).toEqual(expected);
		}
	});
});
