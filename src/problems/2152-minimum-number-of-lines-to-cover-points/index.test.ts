import { describe, expect, it } from "bun:test";
import { minimumNumberOfLinesToCoverPoints as minimumLines } from ".";

describe("2152. Minimum Number of Lines to Cover Points", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumLines([
				[0, 1],
				[2, 3],
				[4, 5],
				[4, 3],
			]),
		).toBe(2);
		expect(
			minimumLines([
				[0, 2],
				[-2, -2],
				[1, 4],
			]),
		).toBe(1);
	});

	it("covers scattered points in pairs", () => {
		expect(minimumLines([[0, 0]])).toBe(1);
		expect(
			minimumLines([
				[0, 0],
				[1, 0],
				[0, 1],
				[5, 7],
			]),
		).toBe(2);
		expect(
			minimumLines([
				[0, 0],
				[1, 2],
				[2, 5],
				[3, 9],
				[4, 14],
			]),
		).toBe(3);
	});
});
