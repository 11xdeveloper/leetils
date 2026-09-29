import { describe, expect, it } from "bun:test";
import { nimGame } from ".";

describe("292. Nim Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(nimGame(4)).toBeFalse();
		expect(nimGame(1)).toBeTrue();
		expect(nimGame(2)).toBeTrue();
	});

	it("matches playing the game out for every heap up to 1000", () => {
		// wins[n]: the player to move can take the last stone from a heap of n.
		const wins = [false];
		for (let n = 1; n <= 1000; n++) {
			wins.push([1, 2, 3].some((take) => take <= n && !wins[n - take]));
			expect(nimGame(n)).toBe(wins[n] ?? false);
		}
	});

	it("handles the largest 32-bit integer", () => {
		expect(nimGame(2 ** 31 - 1)).toBeTrue();
	});
});
