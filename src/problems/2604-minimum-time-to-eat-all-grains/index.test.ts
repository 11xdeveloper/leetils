import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToEatAllGrains as minimumTime } from ".";

/** Tries every assignment of contiguous grain blocks to hens. */
const byBruteForce = (hens: number[], grains: number[]): number => {
	const h = hens.toSorted((a, b) => a - b);
	const g = grains.toSorted((a, b) => a - b);
	const cost = (hen: number, from: number, to: number): number => {
		if (from > to) return 0;
		const left = Math.min(hen, g[from] ?? 0);
		const right = Math.max(hen, g[to] ?? 0);
		return right - left + Math.min(hen - left, right - hen);
	};
	const best = (hen: number, next: number): number => {
		if (next === g.length) return 0;
		if (hen === h.length) return Number.POSITIVE_INFINITY;
		let most = best(hen + 1, next);
		for (let end = next; end < g.length; end++)
			most = Math.min(
				most,
				Math.max(cost(h[hen] ?? 0, next, end), best(hen + 1, end + 1)),
			);
		return most;
	};
	return best(0, 0);
};

describe("2604. Minimum Time to Eat All Grains", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([3, 6, 7], [2, 4, 7, 9])).toBe(2);
		expect(minimumTime([4, 6, 109, 111, 213, 215], [5, 110, 214])).toBe(1);
	});

	it("matches trying every split of grains on random inputs", () => {
		const random = createRandom(2604);
		for (let run = 0; run < 300; run++) {
			const hens = random.array(random.int(1, 4), 0, 20);
			const grains = random.array(random.int(1, 6), 0, 20);
			expect(minimumTime(hens, grains)).toBe(byBruteForce(hens, grains));
		}
	});
});
