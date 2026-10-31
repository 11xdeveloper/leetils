import { describe, expect, it } from "bun:test";
import { countCoveredBuildings } from ".";

describe("3531. Count Covered Buildings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countCoveredBuildings(3, [
				[1, 2],
				[2, 2],
				[3, 2],
				[2, 1],
				[2, 3],
			]),
		).toBe(1);
		expect(
			countCoveredBuildings(3, [
				[1, 1],
				[1, 2],
				[2, 1],
				[2, 2],
			]),
		).toBe(0);
		expect(
			countCoveredBuildings(5, [
				[1, 3],
				[3, 2],
				[3, 3],
				[3, 5],
				[5, 3],
			]),
		).toBe(1);
	});
});
