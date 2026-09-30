import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bagOfTokens as bagOfTokensScore } from ".";

/** Tries playing every remaining token either way. */
const byBruteForce = (tokens: number[], power: number, score = 0): number => {
	let best = score;
	for (const [i, token] of tokens.entries()) {
		const rest = tokens.filter((_, j) => j !== i);
		if (power >= token)
			best = Math.max(best, byBruteForce(rest, power - token, score + 1));
		if (score > 0)
			best = Math.max(best, byBruteForce(rest, power + token, score - 1));
	}
	return best;
};

describe("948. Bag of Tokens", () => {
	it("solves the examples from the problem statement", () => {
		expect(bagOfTokensScore([100], 50)).toBe(0);
		expect(bagOfTokensScore([200, 100], 150)).toBe(1);
		expect(bagOfTokensScore([100, 200, 300, 400], 200)).toBe(2);
	});

	it("matches trying every play on random bags", () => {
		const random = createRandom(948);
		for (let run = 0; run < 200; run++) {
			const tokens = random.array(random.int(0, 6), 1, 20);
			const power = random.int(0, 30);
			expect(bagOfTokensScore(tokens, power)).toBe(byBruteForce(tokens, power));
		}
	});
});
