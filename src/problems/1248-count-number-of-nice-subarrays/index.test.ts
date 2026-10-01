import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfNiceSubarrays as numberOfSubarrays } from ".";

/** Counts the odd numbers in every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let nice = 0;
	for (let i = 0; i < nums.length; i++) {
		let odd = 0;
		for (let j = i; j < nums.length; j++) {
			odd += (nums[j] ?? 0) % 2;
			if (odd === k) nice++;
		}
	}
	return nice;
};

describe("1248. Count Number of Nice Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubarrays([1, 1, 2, 1, 1], 3)).toBe(2);
		expect(numberOfSubarrays([2, 4, 6], 1)).toBe(0);
		expect(numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)).toBe(16);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(1248);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 15), 1, 6);
			const k = random.int(1, nums.length);
			expect(numberOfSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
