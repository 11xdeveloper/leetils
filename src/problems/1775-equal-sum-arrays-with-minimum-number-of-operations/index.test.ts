import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { equalSumArraysWithMinimumNumberOfOperations as minOperations } from ".";

/** Tries every number of changes to each array. */
const byBruteForce = (a: number[], b: number[]): number => {
	// Changing x elements of an array can move its sum anywhere between the
	// extremes reached by changing its x largest (or smallest) elements.
	const range = (nums: number[], x: number) => {
		const sorted = nums.toSorted((p, q) => p - q);
		const total = sorted.reduce((s, v) => s + v, 0);
		const low =
			total - sorted.slice(nums.length - x).reduce((s, v) => s + v - 1, 0);
		const high = total + sorted.slice(0, x).reduce((s, v) => s + 6 - v, 0);
		return [low, high] as const;
	};
	let best = Infinity;
	for (let x = 0; x <= a.length; x++) {
		for (let y = 0; y <= b.length; y++) {
			const [lowA, highA] = range(a, x);
			const [lowB, highB] = range(b, y);
			if (Math.max(lowA, lowB) <= Math.min(highA, highB))
				best = Math.min(best, x + y);
		}
	}
	return best === Infinity ? -1 : best;
};

describe("1775. Equal Sum Arrays With Minimum Number of Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 3, 4, 5, 6], [1, 1, 2, 2, 2, 2])).toBe(3);
		expect(minOperations([1, 1, 1, 1, 1, 1, 1], [6])).toBe(-1);
		expect(minOperations([6, 6], [1])).toBe(3);
	});

	it("matches trying every number of changes on random inputs", () => {
		const random = createRandom(1775);
		for (let run = 0; run < 300; run++) {
			const a = random.array(random.int(1, 8), 1, 6);
			const b = random.array(random.int(1, 8), 1, 6);
			expect(minOperations(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
