import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumCaloriesBurntFromJumps as maxCaloriesBurnt } from ".";

/** Tries every order. */
const byBruteForce = (heights: number[]): number => {
	let best = 0;
	const go = (at: number, rest: number[], total: number): void => {
		if (rest.length === 0) best = Math.max(best, total);
		rest.forEach((h, i) => {
			go(h, [...rest.slice(0, i), ...rest.slice(i + 1)], total + (h - at) ** 2);
		});
	};
	go(0, heights, 0);
	return best;
};

describe("3730. Maximum Calories Burnt from Jumps", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCaloriesBurnt([1, 7, 9])).toBe(181);
		expect(maxCaloriesBurnt([5, 2, 4])).toBe(38);
		expect(maxCaloriesBurnt([3, 3])).toBe(9);
	});

	it("matches trying every order on random heights", () => {
		const random = createRandom(3730);
		for (let run = 0; run < 150; run++) {
			const heights = random.array(random.int(1, 6), 1, 20);
			expect(maxCaloriesBurnt(heights)).toBe(byBruteForce(heights));
		}
	});
});
