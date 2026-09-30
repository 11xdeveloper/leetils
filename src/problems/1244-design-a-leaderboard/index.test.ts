import { describe, expect, it } from "bun:test";
import { DesignALeaderboard as Leaderboard } from ".";

describe("1244. Design A Leaderboard", () => {
	it("solves the example from the problem statement", () => {
		const board = new Leaderboard();
		board.addScore(1, 73);
		board.addScore(2, 56);
		board.addScore(3, 39);
		board.addScore(4, 51);
		board.addScore(5, 4);
		expect(board.top(1)).toBe(73);
		board.reset(1);
		board.reset(2);
		board.addScore(2, 51);
		expect(board.top(3)).toBe(141);
	});

	it("adds repeated scores for the same player", () => {
		const board = new Leaderboard();
		board.addScore(7, 10);
		board.addScore(7, 15);
		board.addScore(8, 20);
		expect(board.top(1)).toBe(25);
		expect(board.top(2)).toBe(45);
	});
});
