import { describe, expect, it } from "bun:test";
import { checkIfAllTheIntegersInARangeAreCovered as isCovered } from ".";

describe("1893. Check if All the Integers in a Range Are Covered", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isCovered(
				[
					[1, 2],
					[3, 4],
					[5, 6],
				],
				2,
				5,
			),
		).toBeTrue();
		expect(
			isCovered(
				[
					[1, 10],
					[10, 20],
				],
				21,
				21,
			),
		).toBeFalse();
	});
});
