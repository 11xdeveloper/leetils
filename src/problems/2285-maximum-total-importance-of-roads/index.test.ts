import { describe, expect, it } from "bun:test";
import { maximumTotalImportanceOfRoads as maximumImportance } from ".";

describe("2285. Maximum Total Importance of Roads", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumImportance(5, [
				[0, 1],
				[1, 2],
				[2, 3],
				[0, 2],
				[1, 3],
				[2, 4],
			]),
		).toBe(43);
		expect(
			maximumImportance(5, [
				[0, 3],
				[2, 4],
				[1, 3],
			]),
		).toBe(20);
	});
});
