import { describe, expect, it } from "bun:test";
import { findTriangularSumOfAnArray as triangularSum } from ".";

describe("2221. Find Triangular Sum of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(triangularSum([1, 2, 3, 4, 5])).toBe(8);
		expect(triangularSum([5])).toBe(5);
	});
});
