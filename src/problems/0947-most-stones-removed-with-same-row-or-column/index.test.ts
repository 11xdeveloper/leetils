import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mostStonesRemovedWithSameRowOrColumn as removeStones } from ".";

/** Tries removing each removable stone in turn, recursively. */
const byBruteForce = (stones: number[][]): number => {
	let best = 0;
	for (const [i, [row, col]] of stones.entries()) {
		if (stones.some(([r, c], j) => j !== i && (r === row || c === col)))
			best = Math.max(best, 1 + byBruteForce(stones.filter((_, j) => j !== i)));
	}
	return best;
};

describe("947. Most Stones Removed with Same Row or Column", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeStones([
				[0, 0],
				[0, 1],
				[1, 0],
				[1, 2],
				[2, 1],
				[2, 2],
			]),
		).toBe(5);
		expect(
			removeStones([
				[0, 0],
				[0, 2],
				[1, 1],
				[2, 0],
				[2, 2],
			]),
		).toBe(3);
		expect(removeStones([[0, 0]])).toBe(0);
	});

	it("matches trying every order of removals on random stones", () => {
		const random = createRandom(947);
		for (let run = 0; run < 200; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 6); i > 0; i--) {
				const stone = [random.int(0, 3), random.int(0, 3)];
				unique.set(stone.join(), stone);
			}
			const stones = [...unique.values()];
			expect(removeStones(stones)).toBe(byBruteForce(stones));
		}
	});
});
