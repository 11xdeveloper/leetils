import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithMedianK as countSubarrays } from ".";

describe("2488. Count Subarrays With Median K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([3, 2, 1, 4, 5], 4)).toBe(3);
		expect(countSubarrays([2, 3, 1], 3)).toBe(1);
	});

	it("matches checking every subarray on random permutations", () => {
		const random = createRandom(2488);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 10);
			const nums = Array.from({ length: n }, (_, i) => i + 1).sort(
				() => random.next() - 0.5,
			);
			const k = random.int(1, n);
			let expected = 0;
			for (let i = 0; i < n; i++)
				for (let j = i + 1; j <= n; j++) {
					const sorted = nums.slice(i, j).sort((a, b) => a - b);
					if (sorted[Math.floor((sorted.length - 1) / 2)] === k) expected++;
				}
			expect(countSubarrays(nums, k)).toBe(expected);
		}
	});
});
