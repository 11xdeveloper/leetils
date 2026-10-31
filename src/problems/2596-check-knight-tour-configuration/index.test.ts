import { describe, expect, it } from "bun:test";
import { checkKnightTourConfiguration as checkValidGrid } from ".";

describe("2596. Check Knight Tour Configuration", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			checkValidGrid([
				[0, 11, 16, 5, 20],
				[17, 4, 19, 10, 15],
				[12, 1, 8, 21, 6],
				[3, 18, 23, 14, 9],
				[24, 13, 2, 7, 22],
			]),
		).toBe(true);
		expect(
			checkValidGrid([
				[0, 3, 6],
				[5, 8, 1],
				[2, 7, 4],
			]),
		).toBe(false);
	});
});
