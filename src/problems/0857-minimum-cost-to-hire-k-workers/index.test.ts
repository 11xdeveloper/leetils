import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumCostToHireKWorkers as mincostToHireWorkers } from ".";

/** Tries every group of k workers. */
const byBruteForce = (quality: number[], wage: number[], k: number): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << quality.length; mask++) {
		const group = quality.flatMap((_, i) => (mask & (1 << i) ? [i] : []));
		if (group.length !== k) continue;
		const rate = Math.max(
			...group.map((i) => (wage[i] ?? 0) / (quality[i] ?? 1)),
		);
		best = Math.min(
			best,
			rate * group.reduce((sum, i) => sum + (quality[i] ?? 0), 0),
		);
	}
	return best;
};

describe("857. Minimum Cost to Hire K Workers", () => {
	it("solves the examples from the problem statement", () => {
		expect(mincostToHireWorkers([10, 20, 5], [70, 50, 30], 2)).toBeCloseTo(
			105,
			5,
		);
		expect(
			mincostToHireWorkers([3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3),
		).toBeCloseTo(30.66667, 5);
	});

	it("matches trying every group on random inputs", () => {
		const random = createRandom(857);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 8);
			const quality = random.array(n, 1, 10);
			const wage = random.array(n, 1, 10);
			const k = random.int(1, n);
			expect(mincostToHireWorkers(quality, wage, k)).toBeCloseTo(
				byBruteForce(quality, wage, k),
				9,
			);
		}
	});
});
