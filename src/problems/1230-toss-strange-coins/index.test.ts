import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { tossStrangeCoins as probabilityOfHeads } from ".";

/** Adds up the probability of every outcome with the right number of heads. */
const byBruteForce = (prob: number[], target: number): number => {
	let total = 0;
	for (let outcome = 0; outcome < 2 ** prob.length; outcome++) {
		let [chance, heads] = [1, 0];
		prob.forEach((p, i) => {
			if (outcome & (1 << i)) {
				chance *= p;
				heads++;
			} else chance *= 1 - p;
		});
		if (heads === target) total += chance;
	}
	return total;
};

describe("1230. Toss Strange Coins", () => {
	it("solves the examples from the problem statement", () => {
		expect(probabilityOfHeads([0.4], 1)).toBeCloseTo(0.4, 9);
		expect(probabilityOfHeads([0.5, 0.5, 0.5, 0.5, 0.5], 0)).toBeCloseTo(
			0.03125,
			9,
		);
	});

	it("handles certain coins", () => {
		expect(probabilityOfHeads([1, 1, 0], 2)).toBe(1);
		expect(probabilityOfHeads([1, 1, 0], 3)).toBe(0);
	});

	it("matches adding up every outcome on random inputs", () => {
		const random = createRandom(1230);
		for (let run = 0; run < 200; run++) {
			const prob = Array.from({ length: random.int(1, 8) }, () =>
				random.next(),
			);
			const target = random.int(0, prob.length);
			expect(probabilityOfHeads(prob, target)).toBeCloseTo(
				byBruteForce(prob, target),
				9,
			);
		}
	});
});
