import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumCircularSubarray as maxSubarraySumCircular } from ".";

describe("918. Maximum Sum Circular Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarraySumCircular([1, -2, 3, -2])).toBe(3);
		expect(maxSubarraySumCircular([5, -3, 5])).toBe(10);
		expect(maxSubarraySumCircular([-3, -2, -3])).toBe(-2);
	});

	it("matches checking every circular subarray on random inputs", () => {
		const random = createRandom(918);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 10), -5, 5);
			const n = nums.length;
			let expected = Number.NEGATIVE_INFINITY;
			for (let start = 0; start < n; start++) {
				let sum = 0;
				for (let length = 1; length <= n; length++) {
					sum += nums[(start + length - 1) % n] ?? 0;
					expected = Math.max(expected, sum);
				}
			}
			expect(maxSubarraySumCircular(nums)).toBe(expected);
		}
	});
});
