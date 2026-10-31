import { describe, expect, it } from "bun:test";
import { numberOfSpacesCleaningRobotCleaned as cleanedSpaces } from ".";

describe("2061. Number of Spaces Cleaning Robot Cleaned", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cleanedSpaces([
				[0, 0, 0],
				[1, 1, 0],
				[0, 0, 0],
			]),
		).toBe(7);
		expect(
			cleanedSpaces([
				[0, 1, 0],
				[1, 0, 0],
				[0, 0, 0],
			]),
		).toBe(1);
		expect(
			cleanedSpaces([
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(8);
	});

	it("handles a single cell", () => {
		expect(cleanedSpaces([[0]])).toBe(1);
	});
});
