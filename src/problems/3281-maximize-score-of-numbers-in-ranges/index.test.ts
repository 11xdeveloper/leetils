import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeScoreOfNumbersInRanges as maxPossibleScore } from ".";

/** Tries every choice of picks. */
const byBruteForce = (start: number[], d: number): number => {
	let best = 0;
	const choose = (i: number, picks: number[]): void => {
		if (i === start.length) {
			const sorted = picks.toSorted((a, b) => a - b);
			let gap = Number.POSITIVE_INFINITY;
			for (let k = 1; k < sorted.length; k++)
				gap = Math.min(gap, (sorted[k] ?? 0) - (sorted[k - 1] ?? 0));
			best = Math.max(best, gap);
			return;
		}
		for (let v = start[i] ?? 0; v <= (start[i] ?? 0) + d; v++)
			choose(i + 1, [...picks, v]);
	};
	choose(0, []);
	return best;
};

describe("3281. Maximize Score of Numbers in Ranges", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxPossibleScore([6, 0, 3], 2)).toBe(4);
		expect(maxPossibleScore([2, 6, 13, 13], 5)).toBe(5);
	});

	it("matches trying every pick on random ranges", () => {
		const random = createRandom(3281);
		for (let run = 0; run < 200; run++) {
			const start = random.array(random.int(2, 4), 0, 10);
			const d = random.int(0, 4);
			expect(maxPossibleScore(start, d)).toBe(byBruteForce(start, d));
		}
	});
});
