import { describe, expect, it } from "bun:test";
import { findOriginalArrayFromDoubledArray as findOriginal } from ".";

describe("2007. Find Original Array From Doubled Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findOriginal([1, 3, 4, 2, 6, 8])).toEqual([1, 3, 4]);
		expect(findOriginal([6, 3, 0, 1])).toEqual([]);
		expect(findOriginal([1])).toEqual([]);
	});

	it("pairs zeros with each other", () => {
		expect(findOriginal([0, 0, 0, 0])).toEqual([0, 0]);
		expect(findOriginal([0, 0, 0])).toEqual([]);
	});

	it("handles chains of doubles", () => {
		expect(findOriginal([4, 2, 2, 1])).toEqual([1, 2]);
		expect(findOriginal([2, 1, 2, 4, 2, 4])).toEqual([1, 2, 2]);
	});
});
