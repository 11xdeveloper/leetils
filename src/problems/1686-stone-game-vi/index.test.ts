import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameVI } from ".";

/** Minimax over the remaining stones, on Alice's score minus Bob's. */
const byBruteForce = (alice: number[], bob: number[]): number => {
	const n = alice.length;
	const memo = new Map<number, number>();
	const play = (taken: number, turn: number): number => {
		if (taken === (1 << n) - 1) return 0;
		const cached = memo.get(taken);
		if (cached !== undefined) return cached;
		let best = turn === 0 ? -Infinity : Infinity;
		for (let i = 0; i < n; i++) {
			if (taken & (1 << i)) continue;
			const rest = play(taken | (1 << i), 1 - turn);
			best =
				turn === 0
					? Math.max(best, rest + (alice[i] ?? 0))
					: Math.min(best, rest - (bob[i] ?? 0));
		}
		memo.set(taken, best);
		return best;
	};
	return Math.sign(play(0, 0));
};

describe("1686. Stone Game VI", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameVI([1, 3], [2, 1])).toBe(1);
		expect(stoneGameVI([1, 2], [3, 1])).toBe(0);
		expect(stoneGameVI([2, 4, 3], [1, 6, 7])).toBe(-1);
	});

	it("matches minimax on random inputs", () => {
		const random = createRandom(1686);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const [alice, bob] = [random.array(n, 1, 6), random.array(n, 1, 6)];
			expect(stoneGameVI(alice, bob)).toBe(byBruteForce(alice, bob));
		}
	});
});
