import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTwoNonOverlappingSubArraysEachWithTargetSum as minSumOfLengths } from ".";

/** Lists every target-sum subarray and tries every disjoint pair. */
const byBruteForce = (arr: number[], target: number): number => {
	const found: [number, number][] = [];
	for (let i = 0; i < arr.length; i++) {
		let sum = 0;
		for (let j = i; j < arr.length; j++) {
			sum += arr[j] ?? 0;
			if (sum === target) found.push([i, j]);
		}
	}
	let best = Infinity;
	for (const [a, b] of found) {
		for (const [c, d] of found)
			if (b < c) best = Math.min(best, b - a + 1 + d - c + 1);
	}
	return best === Infinity ? -1 : best;
};

describe("1477. Find Two Non-overlapping Sub-arrays Each With Target Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSumOfLengths([3, 2, 2, 4, 3], 3)).toBe(2);
		expect(minSumOfLengths([7, 3, 4, 7], 7)).toBe(2);
		expect(minSumOfLengths([4, 3, 2, 6, 2, 3, 4], 6)).toBe(-1);
	});

	it("matches trying every pair on random inputs", () => {
		const random = createRandom(1477);
		for (let run = 0; run < 300; run++) {
			const arr = random.array(random.int(1, 12), 1, 4);
			const target = random.int(1, 8);
			expect(minSumOfLengths(arr, target)).toBe(byBruteForce(arr, target));
		}
	});
});
