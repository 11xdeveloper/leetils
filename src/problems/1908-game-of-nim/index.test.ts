import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { gameOfNim as nimGame } from ".";

/** Memoised search over sorted pile sizes. */
const byBruteForce = (piles: number[]): boolean => {
	const memo = new Map<string, boolean>();
	const wins = (state: number[]): boolean => {
		const key = state.toSorted((a, b) => a - b).join(",");
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let result = false;
		for (const [i, pile] of state.entries()) {
			for (let take = 1; take <= pile && !result; take++) {
				if (!wins(state.map((p, j) => (j === i ? p - take : p)))) result = true;
			}
		}
		memo.set(key, result);
		return result;
	};
	return wins(piles);
};

describe("1908. Game of Nim", () => {
	it("solves the examples from the problem statement", () => {
		expect(nimGame([1])).toBeTrue();
		expect(nimGame([1, 1])).toBeFalse();
		expect(nimGame([1, 2, 3])).toBeFalse();
	});

	it("matches searching the game on random piles", () => {
		const random = createRandom(1908);
		for (let run = 0; run < 200; run++) {
			const piles = random.array(random.int(1, 4), 1, 6);
			expect(nimGame(piles)).toBe(byBruteForce(piles));
		}
	});
});
