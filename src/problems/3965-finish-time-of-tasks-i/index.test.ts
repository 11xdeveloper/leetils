import { describe, expect, it } from "bun:test";
import { finishTimeOfTasksI as finishTime } from ".";

describe("3965. Finish Time of Tasks I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			finishTime(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[9, 5, 3],
			),
		).toBe(17);
		expect(
			finishTime(
				3,
				[
					[0, 1],
					[0, 2],
				],
				[4, 7, 6],
			),
		).toBe(12);
		expect(
			finishTime(
				4,
				[
					[0, 1],
					[0, 2],
					[2, 3],
				],
				[5, 8, 2, 1],
			),
		).toBe(18);
	});
});
