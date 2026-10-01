import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theNumberOfGoodSubsets as numberOfGoodSubsets } from ".";

/** Checks every subset's product. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		let product = nums.reduce((p, v, i) => (mask & (1 << i) ? p * v : p), 1);
		if (product === 1) continue;
		let good = true;
		for (let d = 2; d <= product && good; d++) {
			if (product % d !== 0) continue;
			product /= d;
			if (product % d === 0) good = false;
		}
		if (good) count++;
	}
	return count;
};

describe("1994. The Number of Good Subsets", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfGoodSubsets([1, 2, 3, 4])).toBe(6);
		expect(numberOfGoodSubsets([4, 2, 3, 15])).toBe(5);
	});

	it("matches checking every subset on random inputs", () => {
		const random = createRandom(1994);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 30);
			expect(numberOfGoodSubsets(nums)).toBe(byBruteForce(nums));
		}
	});
});
