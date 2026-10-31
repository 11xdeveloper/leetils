import { describe, expect, it } from "bun:test";
import { earliestTimeToFinishOneTask as earliestTime } from ".";

describe("3683. Earliest Time to Finish One Task", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			earliestTime([
				[1, 6],
				[2, 3],
			]),
		).toBe(5);
		expect(
			earliestTime([
				[100, 100],
				[100, 100],
				[100, 100],
			]),
		).toBe(200);
	});
});
