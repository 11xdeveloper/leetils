import { describe, expect, it } from "bun:test";
import { powerGridMaintenance as processQueries } from ".";

describe("3607. Power Grid Maintenance", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			processQueries(
				5,
				[
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
				],
				[
					[1, 3],
					[2, 1],
					[1, 1],
					[2, 2],
					[1, 2],
				],
			),
		).toEqual([3, 2, 3]);
		expect(
			processQueries(
				3,
				[],
				[
					[1, 1],
					[2, 1],
					[1, 1],
				],
			),
		).toEqual([1, -1]);
	});
});
