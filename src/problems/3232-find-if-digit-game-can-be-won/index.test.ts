import { describe, expect, it } from "bun:test";
import { findIfDigitGameCanBeWon as canAliceWin } from ".";

describe("3232. Find if Digit Game Can Be Won", () => {
	it("solves the examples from the problem statement", () => {
		expect(canAliceWin([1, 2, 3, 4, 10])).toBeFalse();
		expect(canAliceWin([1, 2, 3, 4, 5, 14])).toBeTrue();
		expect(canAliceWin([5, 5, 5, 25])).toBeTrue();
	});
});
