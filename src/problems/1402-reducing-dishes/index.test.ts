import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reducingDishes as maxSatisfaction } from ".";

/** Tries every subset, cooked in increasing order. */
const byBruteForce = (satisfaction: number[]): number => {
	let best = 0;
	for (let mask = 0; mask < 2 ** satisfaction.length; mask++) {
		const chosen = satisfaction
			.filter((_, i) => mask & (1 << i))
			.sort((a, b) => a - b);
		best = Math.max(
			best,
			chosen.reduce((sum, dish, i) => sum + dish * (i + 1), 0),
		);
	}
	return best;
};

describe("1402. Reducing Dishes", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSatisfaction([-1, -8, 0, 5, -9])).toBe(14);
		expect(maxSatisfaction([4, 3, 2])).toBe(20);
		expect(maxSatisfaction([-1, -4, -5])).toBe(0);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1402);
		for (let run = 0; run < 300; run++) {
			const satisfaction = random.array(random.int(1, 10), -10, 10);
			expect(maxSatisfaction(satisfaction)).toBe(byBruteForce(satisfaction));
		}
	});
});
