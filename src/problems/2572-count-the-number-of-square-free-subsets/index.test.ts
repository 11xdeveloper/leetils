import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfSquareFreeSubsets as squareFreeSubsets } from ".";

/** Checks every subset's product. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		let product = 1;
		for (let i = 0; i < nums.length; i++)
			if ((mask >> i) & 1) product *= nums[i] ?? 1;
		let squareFree = true;
		for (let d = 2; d * d <= product; d++)
			if (product % (d * d) === 0) squareFree = false;
		if (squareFree) count++;
	}
	return count;
};

describe("2572. Count the Number of Square-Free Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(squareFreeSubsets([3, 4, 4, 5])).toBe(3);
		expect(squareFreeSubsets([1])).toBe(1);
	});

	it("matches checking every subset on random inputs", () => {
		const random = createRandom(2572);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), 1, 30);
			expect(squareFreeSubsets(nums)).toBe(byBruteForce(nums));
		}
	});
});
