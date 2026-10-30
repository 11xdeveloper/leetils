import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countCompleteSubarraysInAnArray as countCompleteSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	const distinct = new Set(nums).size;
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++)
			if (new Set(nums.slice(i, j + 1)).size === distinct) count++;
	return count;
};

describe("2799. Count Complete Subarrays in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(countCompleteSubarrays([1, 3, 1, 2, 2])).toBe(4);
		expect(countCompleteSubarrays([5, 5, 5, 5])).toBe(10);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2799);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			expect(countCompleteSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
