import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestRangeCoveringElementsFromKLists as smallestRange } from ".";

/** Tries every pair of numbers as the ends of the range. */
const byBruteForce = (nums: number[][]): number[] => {
	const all = [...new Set(nums.flat())].sort((a, b) => a - b);
	let best: number[] = [];
	for (const a of all) {
		for (const b of all) {
			if (
				b < a ||
				!nums.every((list) => list.some((num) => a <= num && num <= b))
			)
				continue;
			const [bestA = 0, bestB = 0] = best;
			if (
				best.length === 0 ||
				b - a < bestB - bestA ||
				(b - a === bestB - bestA && a < bestA)
			)
				best = [a, b];
		}
	}
	return best;
};

describe("632. Smallest Range Covering Elements from K Lists", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			smallestRange([
				[4, 10, 15, 24, 26],
				[0, 9, 12, 20],
				[5, 18, 22, 30],
			]),
		).toEqual([20, 24]);
		expect(
			smallestRange([
				[1, 2, 3],
				[1, 2, 3],
				[1, 2, 3],
			]),
		).toEqual([1, 1]);
	});

	it("matches trying every range on random lists", () => {
		const random = createRandom(632);
		for (let run = 0; run < 500; run++) {
			const nums = Array.from({ length: random.int(1, 4) }, () =>
				random.array(random.int(1, 5), -10, 10).sort((a, b) => a - b),
			);
			expect(smallestRange(nums)).toEqual(byBruteForce(nums));
		}
	});
});
