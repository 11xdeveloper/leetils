import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheBeautyOfTheGarden as maximumBeauty } from ".";

/** Tries every pair of equal ends. */
const byBruteForce = (flowers: number[]): number => {
	let best = -Infinity;
	for (let i = 0; i < flowers.length; i++) {
		for (let j = i + 1; j < flowers.length; j++) {
			if (flowers[i] !== flowers[j]) continue;
			const middle = flowers
				.slice(i + 1, j)
				.reduce((sum, f) => sum + Math.max(f, 0), 0);
			best = Math.max(best, 2 * (flowers[i] ?? 0) + middle);
		}
	}
	return best;
};

describe("1788. Maximize the Beauty of the Garden", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBeauty([1, 2, 3, 1, 2])).toBe(8);
		expect(maximumBeauty([100, 1, 1, -3, 1])).toBe(3);
		expect(maximumBeauty([-1, -2, 0, -1])).toBe(-2);
	});

	it("matches trying every pair of ends on random inputs", () => {
		const random = createRandom(1788);
		for (let run = 0; run < 300; run++) {
			const flowers = random.array(random.int(2, 12), -4, 4);
			flowers.push(flowers[0] ?? 0);
			expect(maximumBeauty(flowers)).toBe(byBruteForce(flowers));
		}
	});
});
