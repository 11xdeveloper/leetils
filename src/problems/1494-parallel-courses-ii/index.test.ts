import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { parallelCoursesII as minNumberOfSemesters } from ".";

/** Search over taken sets, trying every non-empty subset of available courses up to k. */
const byBruteForce = (n: number, relations: number[][], k: number): number => {
	const memo = new Map<number, number>();
	const solve = (taken: number): number => {
		if (taken === (1 << n) - 1) return 0;
		const cached = memo.get(taken);
		if (cached !== undefined) return cached;
		const available: number[] = [];
		for (let c = 0; c < n; c++) {
			const ready = relations.every(
				([b = 1, a = 1]) => a - 1 !== c || taken & (1 << (b - 1)),
			);
			if (!(taken & (1 << c)) && ready) available.push(c);
		}
		let best = Infinity;
		for (let mask = 1; mask < 2 ** available.length; mask++) {
			const chosen = available.filter((_, i) => mask & (1 << i));
			if (chosen.length > k) continue;
			best = Math.min(
				best,
				1 + solve(chosen.reduce((m, c) => m | (1 << c), taken)),
			);
		}
		memo.set(taken, best);
		return best;
	};
	return solve(0);
};

describe("1494. Parallel Courses II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minNumberOfSemesters(
				4,
				[
					[2, 1],
					[3, 1],
					[1, 4],
				],
				2,
			),
		).toBe(3);
		expect(
			minNumberOfSemesters(
				5,
				[
					[2, 1],
					[3, 1],
					[4, 1],
					[1, 5],
				],
				2,
			),
		).toBe(4);
	});

	it("handles fifteen independent courses", () => {
		expect(minNumberOfSemesters(15, [], 4)).toBe(4);
		expect(minNumberOfSemesters(15, [], 15)).toBe(1);
	});

	it("matches trying every choice on random dependency graphs", () => {
		const random = createRandom(1494);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 7);
			const relations: number[][] = [];
			for (let a = 1; a <= n; a++) {
				for (let b = a + 1; b <= n; b++)
					if (random.next() < 0.25) relations.push([a, b]);
			}
			const k = random.int(1, 3);
			expect(minNumberOfSemesters(n, relations, k)).toBe(
				byBruteForce(n, relations, k),
			);
		}
	});
});
