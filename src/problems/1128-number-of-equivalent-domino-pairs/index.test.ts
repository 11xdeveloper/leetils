import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfEquivalentDominoPairs as numEquivDominoPairs } from ".";

/** Compares every pair. */
const byBruteForce = (dominoes: number[][]): number => {
	let pairs = 0;
	for (let i = 0; i < dominoes.length; i++) {
		for (let j = i + 1; j < dominoes.length; j++) {
			const [a, b] = dominoes[i] ?? [];
			const [c, d] = dominoes[j] ?? [];
			if ((a === c && b === d) || (a === d && b === c)) pairs++;
		}
	}
	return pairs;
};

describe("1128. Number of Equivalent Domino Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numEquivDominoPairs([
				[1, 2],
				[2, 1],
				[3, 4],
				[5, 6],
			]),
		).toBe(1);
		expect(
			numEquivDominoPairs([
				[1, 2],
				[1, 2],
				[1, 1],
				[1, 2],
				[2, 2],
			]),
		).toBe(3);
	});

	it("matches comparing every pair on random inputs", () => {
		const random = createRandom(1128);
		for (let run = 0; run < 300; run++) {
			const dominoes = Array.from({ length: random.int(1, 30) }, () =>
				random.array(2, 1, 4),
			);
			expect(numEquivDominoPairs(dominoes)).toBe(byBruteForce(dominoes));
		}
	});
});
