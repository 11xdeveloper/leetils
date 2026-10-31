import { describe, expect, it } from "bun:test";
import { sortArrayByAbsoluteValue as sortByAbsoluteValue } from ".";

describe("3667. Sort Array By Absolute Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortByAbsoluteValue([3, -1, -4, 1, 5]).map(Math.abs)).toEqual([
			1, 1, 3, 4, 5,
		]);
		expect(sortByAbsoluteValue([-100, 100])).toEqual([-100, 100]);
	});
});
