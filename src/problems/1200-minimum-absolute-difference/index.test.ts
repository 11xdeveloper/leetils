import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAbsoluteDifference as minimumAbsDifference } from ".";

/** Compares every pair. */
const byBruteForce = (arr: number[]): number[][] => {
	const pairs: number[][] = [];
	for (const a of arr) for (const b of arr) if (a < b) pairs.push([a, b]);
	const smallest = Math.min(...pairs.map(([a = 0, b = 0]) => b - a));
	return pairs
		.filter(([a = 0, b = 0]) => b - a === smallest)
		.sort((p, q) => (p[0] ?? 0) - (q[0] ?? 0));
};

describe("1200. Minimum Absolute Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumAbsDifference([4, 2, 1, 3])).toEqual([
			[1, 2],
			[2, 3],
			[3, 4],
		]);
		expect(minimumAbsDifference([1, 3, 6, 10, 15])).toEqual([[1, 3]]);
		expect(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27])).toEqual([
			[-14, -10],
			[19, 23],
			[23, 27],
		]);
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(1200);
		for (let run = 0; run < 300; run++) {
			const arr = [...new Set(random.array(random.int(2, 12), -20, 20))];
			if (arr.length < 2) continue;
			expect(minimumAbsDifference(arr)).toEqual(byBruteForce(arr));
		}
	});
});
