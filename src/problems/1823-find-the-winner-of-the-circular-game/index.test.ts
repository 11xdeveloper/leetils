import { describe, expect, it } from "bun:test";
import { findTheWinnerOfTheCircularGame as findTheWinner } from ".";

/** Plays the game with an array. */
const bySimulation = (n: number, k: number): number => {
	const circle = Array.from({ length: n }, (_, i) => i + 1);
	let at = 0;
	while (circle.length > 1) {
		at = (at + k - 1) % circle.length;
		circle.splice(at, 1);
	}
	return circle[0] ?? 0;
};

describe("1823. Find the Winner of the Circular Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(findTheWinner(5, 2)).toBe(3);
		expect(findTheWinner(6, 5)).toBe(1);
	});

	it("matches playing the game for small inputs", () => {
		for (let n = 1; n <= 20; n++)
			for (let k = 1; k <= n; k++)
				expect(findTheWinner(n, k)).toBe(bySimulation(n, k));
	});
});
