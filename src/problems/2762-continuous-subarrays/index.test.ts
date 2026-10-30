import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { continuousSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const window = nums.slice(i, j + 1);
			if (Math.max(...window) - Math.min(...window) <= 2) count++;
		}
	return count;
};

describe("2762. Continuous Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(continuousSubarrays([5, 4, 2, 4])).toBe(8);
		expect(continuousSubarrays([1, 2, 3])).toBe(6);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2762);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 7);
			expect(continuousSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
