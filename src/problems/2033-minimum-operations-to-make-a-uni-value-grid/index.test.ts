import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeAUniValueGrid as minOpsUniValue } from ".";

describe("2033. Minimum Operations to Make a Uni-Value Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minOpsUniValue(
				[
					[2, 4],
					[6, 8],
				],
				2,
			),
		).toBe(4);
		expect(
			minOpsUniValue(
				[
					[1, 5],
					[2, 3],
				],
				1,
			),
		).toBe(5);
		expect(
			minOpsUniValue(
				[
					[1, 2],
					[3, 4],
				],
				2,
			),
		).toBe(-1);
	});
});
