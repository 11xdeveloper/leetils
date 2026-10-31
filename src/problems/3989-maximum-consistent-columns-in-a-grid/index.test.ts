import { describe, expect, it } from "bun:test";
import { maximumConsistentColumnsInAGrid as maxConsistentColumns } from ".";

describe("3989. Maximum Consistent Columns in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxConsistentColumns([[-2, 0, 3]], 2)).toBe(2);
		expect(
			maxConsistentColumns(
				[
					[1, -1, 1],
					[2, 2, 2],
				],
				1,
			),
		).toBe(2);
		expect(maxConsistentColumns([[-5, 5]], 9)).toBe(1);
	});
});
