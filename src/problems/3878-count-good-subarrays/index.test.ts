import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countGoodSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			const or = part.reduce((a, b) => a | b, 0);
			if (part.includes(or)) count++;
		}
	return count;
};

describe("3878. Count Good Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodSubarrays([4, 2, 3])).toBe(4);
		expect(countGoodSubarrays([1, 3, 1])).toBe(6);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3878);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 7);
			expect(countGoodSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
