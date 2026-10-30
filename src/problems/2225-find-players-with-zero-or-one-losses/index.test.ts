import { describe, expect, it } from "bun:test";
import { findPlayersWithZeroOrOneLosses as findWinners } from ".";

describe("2225. Find Players With Zero or One Losses", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findWinners([
				[1, 3],
				[2, 3],
				[3, 6],
				[5, 6],
				[5, 7],
				[4, 5],
				[4, 8],
				[4, 9],
				[10, 4],
				[10, 9],
			]),
		).toEqual([
			[1, 2, 10],
			[4, 5, 7, 8],
		]);
		expect(
			findWinners([
				[2, 3],
				[1, 3],
				[5, 4],
				[6, 4],
			]),
		).toEqual([[1, 2, 5, 6], []]);
	});
});
