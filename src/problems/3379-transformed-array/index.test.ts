import { describe, expect, it } from "bun:test";
import { transformedArray as constructTransformedArray } from ".";

describe("3379. Transformed Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(constructTransformedArray([3, -2, 1, 1])).toEqual([1, 1, 1, 3]);
		expect(constructTransformedArray([-1, 4, -1])).toEqual([-1, -1, 4]);
	});
});
