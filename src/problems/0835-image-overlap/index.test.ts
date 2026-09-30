import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { imageOverlap as largestOverlap } from ".";

/** Tries every offset. */
const byBruteForce = (a: number[][], b: number[][]): number => {
	const n = a.length;
	let best = 0;
	for (let dr = -n + 1; dr < n; dr++) {
		for (let dc = -n + 1; dc < n; dc++) {
			let count = 0;
			for (let r = 0; r < n; r++)
				for (let c = 0; c < n; c++)
					if (a[r]?.[c] === 1 && b[r + dr]?.[c + dc] === 1) count++;
			best = Math.max(best, count);
		}
	}
	return best;
};

describe("835. Image Overlap", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largestOverlap(
				[
					[1, 1, 0],
					[0, 1, 0],
					[0, 1, 0],
				],
				[
					[0, 0, 0],
					[0, 1, 1],
					[0, 0, 1],
				],
			),
		).toBe(3);
		expect(largestOverlap([[1]], [[1]])).toBe(1);
		expect(largestOverlap([[0]], [[0]])).toBe(0);
	});

	it("matches trying every offset on random images", () => {
		const random = createRandom(835);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const a = Array.from({ length: n }, () => random.array(n, 0, 1));
			const b = Array.from({ length: n }, () => random.array(n, 0, 1));
			expect(largestOverlap(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
