import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGameVII } from ".";

/** Plays every game with Alice maximising and Bob minimising the score difference. */
const byBruteForce = (stones: number[]): number => {
	const play = (left: number[], aliceToMove: boolean): number => {
		if (left.length <= 1) return 0;
		const options = [left.slice(1), left.slice(0, -1)].map((rest) => {
			const score = rest.reduce((sum, stone) => sum + stone, 0);
			return (aliceToMove ? score : -score) + play(rest, !aliceToMove);
		});
		return aliceToMove ? Math.max(...options) : Math.min(...options);
	};
	return play(stones, true);
};

describe("1690. Stone Game VII", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGameVII([5, 3, 1, 4, 2])).toBe(6);
		expect(stoneGameVII([7, 90, 5, 1, 100, 10, 10, 2])).toBe(122);
	});

	it("matches minimax on random inputs", () => {
		const random = createRandom(1690);
		for (let run = 0; run < 200; run++) {
			const stones = random.array(random.int(2, 9), 1, 20);
			expect(stoneGameVII(stones)).toBe(byBruteForce(stones));
		}
	});
});
