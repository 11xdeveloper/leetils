import { describe, expect, it } from "bun:test";
import { countLatticePointsInsideACircle as countLatticePoints } from ".";

describe("2249. Count Lattice Points Inside a Circle", () => {
	it("solves the examples from the problem statement", () => {
		expect(countLatticePoints([[2, 2, 1]])).toBe(5);
		expect(
			countLatticePoints([
				[2, 2, 2],
				[3, 4, 1],
			]),
		).toBe(16);
	});
});
