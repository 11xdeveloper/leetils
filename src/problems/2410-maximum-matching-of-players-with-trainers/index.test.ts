import { describe, expect, it } from "bun:test";
import { maximumMatchingOfPlayersWithTrainers as matchPlayersAndTrainers } from ".";

describe("2410. Maximum Matching of Players With Trainers", () => {
	it("solves the examples from the problem statement", () => {
		expect(matchPlayersAndTrainers([4, 7, 9], [8, 2, 5, 8])).toBe(2);
		expect(matchPlayersAndTrainers([1, 1, 1], [10])).toBe(1);
	});
});
