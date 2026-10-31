import { describe, expect, it } from "bun:test";
import { rotateNonNegativeElements as rotateElements } from ".";

describe("3819. Rotate Non Negative Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(rotateElements([1, -2, 3, -4], 3)).toEqual([3, -2, 1, -4]);
		expect(rotateElements([-3, -2, 7], 1)).toEqual([-3, -2, 7]);
		expect(rotateElements([5, 4, -9, 6], 2)).toEqual([6, 5, -9, 4]);
	});

	it("leaves an all-negative array alone", () => {
		expect(rotateElements([-1, -2], 5)).toEqual([-1, -2]);
	});
});
