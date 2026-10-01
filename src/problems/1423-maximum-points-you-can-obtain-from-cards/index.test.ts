import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPointsYouCanObtainFromCards as maxScore } from ".";

/** Tries every split of k between the two ends. */
const byBruteForce = (cards: number[], k: number): number => {
	let best = 0;
	for (let fromLeft = 0; fromLeft <= k; fromLeft++) {
		const taken = [
			...cards.slice(0, fromLeft),
			...cards.slice(cards.length - (k - fromLeft)),
		];
		best = Math.max(
			best,
			taken.reduce((s, x) => s + x, 0),
		);
	}
	return best;
};

describe("1423. Maximum Points You Can Obtain from Cards", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 2, 3, 4, 5, 6, 1], 3)).toBe(12);
		expect(maxScore([2, 2, 2], 2)).toBe(4);
		expect(maxScore([9, 7, 7, 9, 7, 7, 9], 7)).toBe(55);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1423);
		for (let run = 0; run < 300; run++) {
			const cards = random.array(random.int(1, 12), 1, 20);
			const k = random.int(1, cards.length);
			expect(maxScore(cards, k)).toBe(byBruteForce(cards, k));
		}
	});
});
