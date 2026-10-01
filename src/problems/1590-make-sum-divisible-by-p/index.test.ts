import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { makeSumDivisibleByP as minSubarray } from ".";

/** Tries removing every subarray, shortest first. */
const byBruteForce = (nums: number[], p: number): number => {
	const total = nums.reduce((s, x) => s + x, 0);
	for (let length = 0; length < nums.length; length++) {
		for (let i = 0; i + length <= nums.length; i++) {
			const removed = nums.slice(i, i + length).reduce((s, x) => s + x, 0);
			if ((total - removed) % p === 0) return length;
		}
	}
	return -1;
};

describe("1590. Make Sum Divisible by P", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSubarray([3, 1, 4, 2], 6)).toBe(1);
		expect(minSubarray([6, 3, 5, 2], 9)).toBe(2);
		expect(minSubarray([1, 2, 3], 3)).toBe(0);
	});

	it("can't remove the whole array", () => {
		expect(minSubarray([1, 2, 3], 7)).toBe(-1);
	});

	it("matches trying every removal on random inputs", () => {
		const random = createRandom(1590);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			const p = random.int(1, 12);
			expect(minSubarray(nums, p)).toBe(byBruteForce(nums, p));
		}
	});
});
