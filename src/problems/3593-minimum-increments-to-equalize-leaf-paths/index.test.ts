import { describe, expect, it } from "bun:test";
import { minimumIncrementsToEqualizeLeafPaths as minIncrease } from ".";

describe("3593. Minimum Increments to Equalize Leaf Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minIncrease(
				3,
				[
					[0, 1],
					[0, 2],
				],
				[2, 1, 3],
			),
		).toBe(1);
		expect(
			minIncrease(
				3,
				[
					[0, 1],
					[1, 2],
				],
				[5, 1, 4],
			),
		).toBe(0);
		expect(
			minIncrease(
				5,
				[
					[0, 4],
					[0, 1],
					[1, 2],
					[1, 3],
				],
				[3, 4, 1, 1, 7],
			),
		).toBe(1);
	});
});
