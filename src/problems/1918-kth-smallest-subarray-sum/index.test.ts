import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestSubarraySum } from ".";

describe("1918. Kth Smallest Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthSmallestSubarraySum([2, 1, 3], 4)).toBe(3);
		expect(kthSmallestSubarraySum([3, 3, 5, 5], 7)).toBe(10);
	});

	it("matches sorting every subarray sum on random inputs", () => {
		const random = createRandom(1918);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const sums: number[] = [];
			for (let i = 0; i < nums.length; i++) {
				let sum = 0;
				for (let j = i; j < nums.length; j++) {
					sum += nums[j] ?? 0;
					sums.push(sum);
				}
			}
			sums.sort((a, b) => a - b);
			const k = random.int(1, sums.length);
			expect(kthSmallestSubarraySum(nums, k)).toBe(sums[k - 1] ?? 0);
		}
	});
});
