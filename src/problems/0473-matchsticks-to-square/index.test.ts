import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { matchsticksToSquare as makesquare } from ".";

/** Tries every assignment of sticks to the four sides. */
const byBruteForce = (sticks: number[]): boolean => {
	for (let code = 0; code < 4 ** sticks.length; code++) {
		const sides = [0, 0, 0, 0];
		let rest = code;
		for (const stick of sticks) {
			sides[rest % 4] = (sides[rest % 4] ?? 0) + stick;
			rest = Math.floor(rest / 4);
		}
		if (sides.every((side) => side === sides[0])) return true;
	}
	return false;
};

describe("473. Matchsticks to Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(makesquare([1, 1, 2, 2, 2])).toBeTrue();
		expect(makesquare([3, 3, 3, 3, 4])).toBeFalse();
	});

	it("handles fifteen sticks quickly", () => {
		expect(
			makesquare([5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 1, 1, 1]),
		).toBeFalse();
		expect(
			makesquare([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4]),
		).toBeTrue();
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(473);
		for (let run = 0; run < 300; run++) {
			const sticks = random.array(random.int(1, 8), 1, 4);
			expect(makesquare(sticks)).toBe(byBruteForce(sticks));
		}
	});
});
