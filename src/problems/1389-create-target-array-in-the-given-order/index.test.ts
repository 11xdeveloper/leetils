import { describe, expect, it } from "bun:test";
import { createTargetArrayInTheGivenOrder as createTargetArray } from ".";

describe("1389. Create Target Array in the Given Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1])).toEqual([
			0, 4, 1, 3, 2,
		]);
		expect(createTargetArray([1, 2, 3, 4, 0], [0, 1, 2, 3, 0])).toEqual([
			0, 1, 2, 3, 4,
		]);
		expect(createTargetArray([1], [0])).toEqual([1]);
	});

	it("builds a reversed array by always inserting at the front", () => {
		expect(createTargetArray([1, 2, 3, 4], [0, 0, 0, 0])).toEqual([4, 3, 2, 1]);
	});
});
