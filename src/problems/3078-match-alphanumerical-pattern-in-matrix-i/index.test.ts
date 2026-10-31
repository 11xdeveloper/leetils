import { describe, expect, it } from "bun:test";
import { matchAlphanumericalPatternInMatrixI as findPattern } from ".";

describe("3078. Match Alphanumerical Pattern in Matrix I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findPattern(
				[
					[1, 2, 2],
					[2, 2, 3],
					[2, 3, 3],
				],
				["ab", "bb"],
			),
		).toEqual([0, 0]);
		expect(
			findPattern(
				[
					[1, 1, 2],
					[3, 3, 4],
					[6, 6, 6],
				],
				["ab", "66"],
			),
		).toEqual([1, 1]);
		expect(
			findPattern(
				[
					[1, 2],
					[2, 1],
				],
				["xx"],
			),
		).toEqual([-1, -1]);
	});

	it("keeps different letters on different digits", () => {
		expect(findPattern([[5, 5, 7]], ["ab"])).toEqual([0, 1]);
		expect(findPattern([[5, 5]], ["ab"])).toEqual([-1, -1]);
	});
});
