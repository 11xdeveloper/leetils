import { describe, expect, it } from "bun:test";
import { maximumAreaOfLongestDiagonalRectangle as areaOfMaxDiagonal } from ".";

describe("3000. Maximum Area of Longest Diagonal Rectangle", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			areaOfMaxDiagonal([
				[9, 3],
				[8, 6],
			]),
		).toBe(48);
		expect(
			areaOfMaxDiagonal([
				[3, 4],
				[4, 3],
			]),
		).toBe(12);
	});
});
