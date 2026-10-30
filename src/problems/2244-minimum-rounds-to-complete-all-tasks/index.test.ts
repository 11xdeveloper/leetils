import { describe, expect, it } from "bun:test";
import { minimumRoundsToCompleteAllTasks as minimumRounds } from ".";

describe("2244. Minimum Rounds to Complete All Tasks", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumRounds([2, 2, 3, 3, 2, 4, 4, 4, 4, 4])).toBe(4);
		expect(minimumRounds([2, 3, 3])).toBe(-1);
	});
});
