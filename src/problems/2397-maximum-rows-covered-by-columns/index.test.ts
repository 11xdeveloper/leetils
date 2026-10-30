import { describe, expect, it } from "bun:test";
import { maximumRowsCoveredByColumns as maximumRows } from ".";

describe("2397. Maximum Rows Covered by Columns", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumRows(
				[
					[0, 0, 0],
					[1, 0, 1],
					[0, 1, 1],
					[0, 0, 1],
				],
				2,
			),
		).toBe(3);
		expect(maximumRows([[1], [0]], 1)).toBe(2);
	});
});
