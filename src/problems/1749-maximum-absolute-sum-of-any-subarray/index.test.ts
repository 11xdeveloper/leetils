import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAbsoluteSumOfAnySubarray as maxAbsoluteSum } from ".";

describe("1749. Maximum Absolute Sum of Any Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAbsoluteSum([1, -3, 2, 3, -4])).toBe(5);
		expect(maxAbsoluteSum([2, -5, 1, -4, 3, -2])).toBe(8);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1749);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), -10, 10);
			let best = 0;
			for (let i = 0; i < nums.length; i++) {
				let sum = 0;
				for (let j = i; j < nums.length; j++) {
					sum += nums[j] ?? 0;
					best = Math.max(best, Math.abs(sum));
				}
			}
			expect(maxAbsoluteSum(nums)).toBe(best);
		}
	});
});
