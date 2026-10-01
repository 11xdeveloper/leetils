import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarraySumsDivisibleByK as subarraysDivByK } from ".";

describe("974. Subarray Sums Divisible by K", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarraysDivByK([4, 5, 0, -2, -3, 1], 5)).toBe(7);
		expect(subarraysDivByK([5], 9)).toBe(0);
	});

	it("matches summing every subarray on random inputs", () => {
		const random = createRandom(974);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), -10, 10);
			const k = random.int(2, 7);
			let expected = 0;
			for (let i = 0; i < nums.length; i++) {
				let sum = 0;
				for (let j = i; j < nums.length; j++) {
					sum += nums[j] ?? 0;
					if (sum % k === 0) expected++;
				}
			}
			expect(subarraysDivByK(nums, k)).toBe(expected);
		}
	});
});
