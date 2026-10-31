import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumEnergyBoostFromTwoDrinks as maxEnergyBoost } from ".";

/** Tries every hour-by-hour plan of A, B or rest. */
const byBruteForce = (a: number[], b: number[]): number => {
	const plan = (i: number, last: number): number => {
		if (i >= a.length) return 0;
		let best = 0;
		for (const drink of [0, 1])
			if (last === -1 || last === drink)
				best = Math.max(
					best,
					((drink === 0 ? a : b)[i] ?? 0) + plan(i + 1, drink),
				);
			else best = Math.max(best, plan(i + 1, -1));
		return best;
	};
	return plan(0, -1);
};

describe("3259. Maximum Energy Boost From Two Drinks", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxEnergyBoost([1, 3, 1], [3, 1, 1])).toBe(5);
		expect(maxEnergyBoost([4, 1, 1], [1, 1, 3])).toBe(7);
	});

	it("matches trying every plan on random drinks", () => {
		const random = createRandom(3259);
		for (let run = 0; run < 200; run++) {
			const n = random.int(3, 9);
			const a = random.array(n, 1, 9);
			const b = random.array(n, 1, 9);
			expect(maxEnergyBoost(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
