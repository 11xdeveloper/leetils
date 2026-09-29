import { describe, expect, it } from "bun:test";
import { plusOne } from ".";

describe("66. Plus One", () => {
	it("solves the examples from the problem statement", () => {
		expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
		expect(plusOne([4, 3, 2, 1])).toEqual([4, 3, 2, 2]);
		expect(plusOne([9])).toEqual([1, 0]);
	});

	it("handles single digits", () => {
		expect(plusOne([0])).toEqual([1]);
		expect(plusOne([8])).toEqual([9]);
	});

	it("carries through trailing 9s", () => {
		expect(plusOne([1, 9])).toEqual([2, 0]);
		expect(plusOne([1, 9, 9])).toEqual([2, 0, 0]);
		expect(plusOne([8, 9, 9, 9])).toEqual([9, 0, 0, 0]);
	});

	it("adds a leading 1 when every digit is 9", () => {
		expect(plusOne([9, 9])).toEqual([1, 0, 0]);
		expect(plusOne([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 0]);
	});

	it("handles numbers too large for a JavaScript number", () => {
		const digits = Array.from({ length: 100 }, () => 9);
		expect(plusOne(digits)).toEqual([
			1,
			...Array.from({ length: 100 }, () => 0),
		]);
	});

	it("does not modify the input", () => {
		const digits = [1, 9, 9];
		plusOne(digits);
		expect(digits).toEqual([1, 9, 9]);
	});
});
