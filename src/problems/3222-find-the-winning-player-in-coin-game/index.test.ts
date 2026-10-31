import { describe, expect, it } from "bun:test";
import { findTheWinningPlayerInCoinGame as losingPlayer } from ".";

describe("3222. Find the Winning Player in Coin Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(losingPlayer(2, 7)).toBe("Alice");
		expect(losingPlayer(4, 11)).toBe("Bob");
	});
});
