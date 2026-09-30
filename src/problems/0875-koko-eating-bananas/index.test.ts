import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kokoEatingBananas as minEatingSpeed } from ".";

describe("875. Koko Eating Bananas", () => {
	it("solves the examples from the problem statement", () => {
		expect(minEatingSpeed([3, 6, 7, 11], 8)).toBe(4);
		expect(minEatingSpeed([30, 11, 23, 4, 20], 5)).toBe(30);
		expect(minEatingSpeed([30, 11, 23, 4, 20], 6)).toBe(23);
	});

	it("matches trying every speed on random inputs", () => {
		const random = createRandom(875);
		for (let run = 0; run < 500; run++) {
			const piles = random.array(random.int(1, 6), 1, 30);
			const h = random.int(piles.length, 40);
			let speed = 1;
			while (
				piles.reduce((hours, pile) => hours + Math.ceil(pile / speed), 0) > h
			)
				speed++;
			expect(minEatingSpeed(piles, h)).toBe(speed);
		}
	});
});
