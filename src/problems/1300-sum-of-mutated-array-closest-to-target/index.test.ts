import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfMutatedArrayClosestToTarget as findBestValue } from ".";

/** Tries every value up to the largest element. */
const byBruteForce = (arr: number[], target: number): number => {
	let [best, bestGap] = [0, Infinity];
	for (let value = 0; value <= Math.max(...arr); value++) {
		const gap = Math.abs(
			arr.reduce((sum, x) => sum + Math.min(x, value), 0) - target,
		);
		if (gap < bestGap) [best, bestGap] = [value, gap];
	}
	return best;
};

describe("1300. Sum of Mutated Array Closest to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(findBestValue([4, 9, 3], 10)).toBe(3);
		expect(findBestValue([2, 3, 5], 10)).toBe(5);
		expect(findBestValue([60864, 25176, 27249, 21296, 20204], 56803)).toBe(
			11361,
		);
	});

	it("matches trying every value on random inputs", () => {
		const random = createRandom(1300);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 8), 1, 30);
			const target = random.int(1, 150);
			expect(findBestValue(arr, target)).toBe(byBruteForce(arr, target));
		}
	});
});
