import { describe, expect, it } from "bun:test";
import { findTheKOrOfAnArray as findKOr } from ".";

describe("2917. Find the K-or of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findKOr([7, 12, 9, 8, 9, 15], 4)).toBe(9);
		expect(findKOr([2, 12, 1, 11, 4, 5], 6)).toBe(0);
		expect(findKOr([10, 8, 5, 9, 11, 6, 8], 1)).toBe(15);
	});
});
