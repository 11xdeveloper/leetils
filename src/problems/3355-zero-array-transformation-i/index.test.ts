import { describe, expect, it } from "bun:test";
import { zeroArrayTransformationI as isZeroArray } from ".";

describe("3355. Zero Array Transformation I", () => {
	it("solves the examples from the problem statement", () => {
		expect(isZeroArray([1, 0, 1], [[0, 2]])).toBeTrue();
		expect(
			isZeroArray(
				[4, 3, 2, 1],
				[
					[1, 3],
					[0, 2],
				],
			),
		).toBeFalse();
	});
});
