import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lastStoneWeightII } from ".";

/** Tries every pair to smash, recursively. */
const bySmashing = (stones: number[]): number => {
	if (stones.length <= 1) return stones[0] ?? 0;
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < stones.length; i++) {
		for (let j = i + 1; j < stones.length; j++) {
			const rest = stones.filter((_, k) => k !== i && k !== j);
			const difference = Math.abs((stones[i] ?? 0) - (stones[j] ?? 0));
			best = Math.min(
				best,
				bySmashing(difference === 0 ? rest : [...rest, difference]),
			);
		}
	}
	return best;
};

describe("1049. Last Stone Weight II", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastStoneWeightII([2, 7, 4, 1, 8, 1])).toBe(1);
		expect(lastStoneWeightII([31, 26, 33, 21, 40])).toBe(5);
	});

	it("matches trying every sequence of smashes on random stones", () => {
		const random = createRandom(1049);
		for (let run = 0; run < 200; run++) {
			const stones = random.array(random.int(1, 6), 1, 20);
			expect(lastStoneWeightII(stones)).toBe(bySmashing(stones));
		}
	});
});
