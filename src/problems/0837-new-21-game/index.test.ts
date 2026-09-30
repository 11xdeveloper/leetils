import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { new21Game } from ".";

/** Recursion over the current points, with memoisation. */
const byRecursion = (n: number, k: number, maxPts: number): number => {
	const memo = new Map<number, number>();
	const from = (points: number): number => {
		if (points >= k) return points <= n ? 1 : 0;
		const known = memo.get(points);
		if (known !== undefined) return known;
		let total = 0;
		for (let draw = 1; draw <= maxPts; draw++) total += from(points + draw);
		memo.set(points, total / maxPts);
		return total / maxPts;
	};
	return from(0);
};

describe("837. New 21 Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(new21Game(10, 1, 10)).toBeCloseTo(1, 9);
		expect(new21Game(6, 1, 10)).toBeCloseTo(0.6, 9);
		expect(new21Game(21, 17, 10)).toBeCloseTo(0.73278, 5);
	});

	it("matches recursion on random inputs", () => {
		const random = createRandom(837);
		for (let run = 0; run < 500; run++) {
			const k = random.int(0, 20);
			const n = random.int(k, 40);
			const maxPts = random.int(1, 12);
			expect(new21Game(n, k, maxPts)).toBeCloseTo(byRecursion(n, k, maxPts), 9);
		}
	});
});
