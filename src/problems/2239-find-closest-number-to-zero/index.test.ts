import { describe, expect, it } from "bun:test";
import { findClosestNumberToZero as findClosestNumber } from ".";

describe("2239. Find Closest Number to Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(findClosestNumber([-4, -2, 1, 4, 8])).toBe(1);
		expect(findClosestNumber([2, -1, 1])).toBe(1);
	});
});
