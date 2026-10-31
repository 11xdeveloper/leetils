import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheMinimumGameScore as maxScore } from ".";

/** Tries every walk. */
const byBruteForce = (points: number[], m: number): number => {
	const n = points.length;
	let best = 0;
	const walk = (at: number, moves: number, scores: number[]): void => {
		best = Math.max(best, Math.min(...scores));
		if (moves === m) return;
		for (const next of [at - 1, at + 1]) {
			if (next < 0 || next >= n) continue;
			const updated = [...scores];
			updated[next] = (updated[next] ?? 0) + (points[next] ?? 0);
			walk(next, moves + 1, updated);
		}
	};
	walk(-1, 0, new Array<number>(n).fill(0));
	return best;
};

describe("3449. Maximize the Minimum Game Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([2, 4], 3)).toBe(4);
		expect(maxScore([1, 2, 3], 5)).toBe(2);
	});

	it("matches trying every walk on random inputs", () => {
		const random = createRandom(3449);
		for (let run = 0; run < 100; run++) {
			const points = random.array(random.int(2, 4), 1, 6);
			const m = random.int(1, 10);
			expect(maxScore(points, m)).toBe(byBruteForce(points, m));
		}
	});
});
