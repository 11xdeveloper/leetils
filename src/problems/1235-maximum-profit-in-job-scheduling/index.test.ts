import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumProfitInJobScheduling as jobScheduling } from ".";

/** Tries every subset of jobs. */
const byBruteForce = (
	start: number[],
	end: number[],
	profit: number[],
): number => {
	let best = 0;
	for (let mask = 0; mask < 2 ** start.length; mask++) {
		const chosen = start.flatMap((s, i) =>
			mask & (1 << i) ? [[s, end[i] ?? 0, profit[i] ?? 0]] : [],
		);
		const overlaps = chosen.some(([s1 = 0, e1 = 0], i) =>
			chosen.some(([s2 = 0, e2 = 0], j) => i !== j && s1 < e2 && s2 < e1),
		);
		if (!overlaps)
			best = Math.max(
				best,
				chosen.reduce((sum, [, , p = 0]) => sum + p, 0),
			);
	}
	return best;
};

describe("1235. Maximum Profit in Job Scheduling", () => {
	it("solves the examples from the problem statement", () => {
		expect(jobScheduling([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70])).toBe(
			120,
		);
		expect(
			jobScheduling([1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60]),
		).toBe(150);
		expect(jobScheduling([1, 1, 1], [2, 3, 4], [5, 6, 4])).toBe(6);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1235);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const start = random.array(n, 1, 10);
			const end = start.map((s) => s + random.int(1, 5));
			const profit = random.array(n, 1, 20);
			expect(jobScheduling(start, end, profit)).toBe(
				byBruteForce(start, end, profit),
			);
		}
	});
});
