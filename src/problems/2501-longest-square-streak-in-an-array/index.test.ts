import { describe, expect, it } from "bun:test";
import { longestSquareStreakInAnArray as longestSquareStreak } from ".";

describe("2501. Longest Square Streak in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestSquareStreak([4, 3, 6, 16, 8, 2])).toBe(3);
		expect(longestSquareStreak([2, 3, 5, 6, 7])).toBe(-1);
	});

	it("follows a streak through every square", () => {
		expect(longestSquareStreak([2, 4, 16, 256, 65536])).toBe(5);
	});
});
