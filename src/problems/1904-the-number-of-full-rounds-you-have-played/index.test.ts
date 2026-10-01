import { describe, expect, it } from "bun:test";
import { theNumberOfFullRoundsYouHavePlayed as numberOfRounds } from ".";

describe("1904. The Number of Full Rounds You Have Played", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfRounds("09:31", "10:14")).toBe(1);
		expect(numberOfRounds("21:30", "03:00")).toBe(22);
	});

	it("returns 0 inside a single round", () => {
		expect(numberOfRounds("00:01", "00:14")).toBe(0);
		expect(numberOfRounds("00:00", "23:59")).toBe(95);
	});
});
