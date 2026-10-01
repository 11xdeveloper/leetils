import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { splitArrayLargestSum } from ".";

/** Tries every way to cut the array into k parts. */
const byBruteForce = (nums: number[], k: number): number => {
	const best = (start: number, parts: number): number => {
		if (parts === 1) return nums.slice(start).reduce((a, b) => a + b, 0);
		let result = Number.POSITIVE_INFINITY;
		let sum = 0;
		for (let end = start; end <= nums.length - parts; end++) {
			sum += nums[end] ?? 0;
			result = Math.min(result, Math.max(sum, best(end + 1, parts - 1)));
		}
		return result;
	};
	return best(0, k);
};

describe("410. Split Array Largest Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitArrayLargestSum([7, 2, 5, 10, 8], 2)).toBe(18);
		expect(splitArrayLargestSum([1, 2, 3, 4, 5], 2)).toBe(9);
	});

	it("handles k of 1 and k equal to the length", () => {
		expect(splitArrayLargestSum([1, 4, 4], 1)).toBe(9);
		expect(splitArrayLargestSum([1, 4, 4], 3)).toBe(4);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(410);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 9), 0, 20);
			const k = random.int(1, nums.length);
			expect(splitArrayLargestSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
