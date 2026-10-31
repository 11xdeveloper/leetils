import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfMNonOverlappingSubarraysI } from "../3956-maximum-sum-of-m-non-overlapping-subarrays-i";
import { maximumSumOfMNonOverlappingSubarraysII as maximumSum } from ".";

describe("3957. Maximum Sum of M Non-Overlapping Subarrays II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSum([4, 1, -5, 2], 2, 1, 3)).toBe(7);
		expect(maximumSum([1, 0, 3, 4], 2, 1, 2)).toBe(8);
		expect(maximumSum([-1, 7, -4], 1, 2, 3)).toBe(6);
		expect(maximumSum([-3, -4, -1], 2, 1, 2)).toBe(-1);
	});

	it("matches the exact dynamic programming on random arrays", () => {
		const random = createRandom(3957);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 14), -8, 8);
			const m = random.int(1, nums.length);
			const l = random.int(1, 3);
			const r = random.int(l, Math.min(nums.length, l + 3));
			if (l > nums.length) continue;
			expect(maximumSum(nums, m, l, r)).toBe(
				maximumSumOfMNonOverlappingSubarraysI(nums, m, l, r),
			);
		}
	});
});
