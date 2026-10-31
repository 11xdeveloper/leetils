import { describe, expect, it } from "bun:test";
import { minimizeConnectedGroupsByInsertingInterval as minConnectedGroups } from ".";

describe("3323. Minimize Connected Groups by Inserting Interval", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minConnectedGroups(
				[
					[1, 3],
					[5, 6],
					[8, 10],
				],
				3,
			),
		).toBe(2);
		expect(
			minConnectedGroups(
				[
					[5, 10],
					[1, 1],
					[3, 3],
				],
				1,
			),
		).toBe(3);
	});
});
