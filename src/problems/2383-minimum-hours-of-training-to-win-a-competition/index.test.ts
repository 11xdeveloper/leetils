import { describe, expect, it } from "bun:test";
import { minimumHoursOfTrainingToWinACompetition as minNumberOfHours } from ".";

describe("2383. Minimum Hours of Training to Win a Competition", () => {
	it("solves the examples from the problem statement", () => {
		expect(minNumberOfHours(5, 3, [1, 4, 3, 2], [2, 6, 3, 1])).toBe(8);
		expect(minNumberOfHours(2, 4, [1], [3])).toBe(0);
	});
});
