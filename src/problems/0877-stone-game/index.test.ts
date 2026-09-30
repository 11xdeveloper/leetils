import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stoneGame } from ".";

describe("877. Stone Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(stoneGame([5, 3, 4, 5])).toBeTrue();
		expect(stoneGame([3, 7, 2, 3])).toBeTrue();
	});

	it("lets Alice win every valid game", () => {
		const random = createRandom(877);
		for (let run = 0; run < 1000; run++) {
			const piles = random.array(2 * random.int(1, 6), 1, 20);
			const total = piles.reduce((a, b) => a + b, 0);
			if (total % 2 === 0) piles[0] = (piles[0] ?? 0) + 1;
			expect(stoneGame(piles)).toBeTrue();
		}
	});
});
