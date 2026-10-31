import { describe, expect, it } from "bun:test";
import { findTheNumberOfWinningPlayers as winningPlayerCount } from ".";

describe("3238. Find the Number of Winning Players", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			winningPlayerCount(4, [
				[0, 0],
				[1, 0],
				[1, 0],
				[2, 1],
				[2, 1],
				[2, 0],
			]),
		).toBe(2);
		expect(
			winningPlayerCount(5, [
				[1, 1],
				[1, 2],
				[1, 3],
				[1, 4],
			]),
		).toBe(0);
		expect(
			winningPlayerCount(5, [
				[1, 1],
				[2, 4],
				[2, 4],
				[2, 4],
			]),
		).toBe(1);
	});
});
