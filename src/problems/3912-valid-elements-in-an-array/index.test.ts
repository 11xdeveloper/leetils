import { describe, expect, it } from "bun:test";
import { validElementsInAnArray as findValidElements } from ".";

describe("3912. Valid Elements in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findValidElements([1, 2, 4, 2, 3, 2])).toEqual([1, 2, 4, 3, 2]);
		expect(findValidElements([5, 5, 5, 5])).toEqual([5, 5]);
		expect(findValidElements([1])).toEqual([1]);
	});
});
