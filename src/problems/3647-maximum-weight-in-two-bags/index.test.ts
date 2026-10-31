import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumWeightInTwoBags as maxWeight } from ".";

/** Tries every assignment. */
const byBruteForce = (weights: number[], w1: number, w2: number): number => {
	let best = 0;
	for (let code = 0; code < 3 ** weights.length; code++) {
		let [a, b] = [0, 0];
		let x = code;
		for (const w of weights) {
			if (x % 3 === 1) a += w;
			else if (x % 3 === 2) b += w;
			x = Math.floor(x / 3);
		}
		if (a <= w1 && b <= w2) best = Math.max(best, a + b);
	}
	return best;
};

describe("3647. Maximum Weight in Two Bags", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxWeight([1, 4, 3, 2], 5, 4)).toBe(9);
		expect(maxWeight([3, 6, 4, 8], 9, 7)).toBe(15);
		expect(maxWeight([5, 7], 2, 3)).toBe(0);
	});

	it("matches trying every assignment on random items", () => {
		const random = createRandom(3647);
		for (let run = 0; run < 200; run++) {
			const weights = random.array(random.int(1, 7), 1, 8);
			const [w1, w2] = [random.int(1, 15), random.int(1, 15)];
			expect(maxWeight(weights, w1, w2)).toBe(byBruteForce(weights, w1, w2));
		}
	});
});
