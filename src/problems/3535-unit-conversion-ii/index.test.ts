import { describe, expect, it } from "bun:test";
import { unitConversionII as queryConversions } from ".";

describe("3535. Unit Conversion II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			queryConversions(
				[
					[0, 1, 2],
					[0, 2, 6],
				],
				[
					[1, 2],
					[1, 0],
				],
			),
		).toEqual([3, 500000004]);
		expect(
			queryConversions(
				[
					[0, 1, 2],
					[0, 2, 6],
					[0, 3, 8],
					[2, 4, 2],
					[2, 5, 4],
					[3, 6, 3],
				],
				[
					[1, 2],
					[0, 4],
					[6, 5],
					[4, 6],
					[6, 1],
				],
			),
		).toEqual([3, 12, 1, 2, 83333334]);
	});
});
