import { describe, expect, it } from "bun:test";
import { divisorGame } from ".";

describe("1025. Divisor Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(divisorGame(2)).toBeTrue();
		expect(divisorGame(3)).toBeFalse();
	});

	it("matches playing the game out for n up to 1,000", () => {
		const wins = [false, false];
		for (let n = 2; n <= 1000; n++) {
			let win = false;
			for (let x = 1; x < n && !win; x++)
				if (n % x === 0 && !wins[n - x]) win = true;
			wins.push(win);
			expect(divisorGame(n)).toBe(win);
		}
	});
});
