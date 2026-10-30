import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfSubarrayRanges as subArrayRanges } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let total = 0;
	for (let i = 0; i < nums.length; i++) {
		let [low, high] = [Infinity, -Infinity];
		for (let j = i; j < nums.length; j++) {
			low = Math.min(low, nums[j] ?? 0);
			high = Math.max(high, nums[j] ?? 0);
			total += high - low;
		}
	}
	return total;
};

describe("2104. Sum of Subarray Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(subArrayRanges([1, 2, 3])).toBe(4);
		expect(subArrayRanges([1, 3, 3])).toBe(4);
		expect(subArrayRanges([4, -2, -3, 4, 1])).toBe(59);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2104);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -5, 5);
			expect(subArrayRanges(nums)).toBe(byBruteForce(nums));
		}
	});
});
