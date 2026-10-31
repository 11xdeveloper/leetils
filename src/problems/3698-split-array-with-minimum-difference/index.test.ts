import { describe, expect, it } from "bun:test";
import { splitArrayWithMinimumDifference as splitArray } from ".";

describe("3698. Split Array With Minimum Difference", () => {
	it("solves the examples from the problem statement", () => {
		expect(splitArray([1, 3, 2])).toBe(2);
		expect(splitArray([1, 2, 4, 3])).toBe(4);
		expect(splitArray([3, 1, 2])).toBe(-1);
	});
});
