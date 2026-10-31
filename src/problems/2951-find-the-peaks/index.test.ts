import { describe, expect, it } from "bun:test";
import { findThePeaks as findPeaks } from ".";

describe("2951. Find the Peaks", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPeaks([2, 4, 4])).toEqual([]);
		expect(findPeaks([1, 4, 3, 8, 5])).toEqual([1, 3]);
	});
});
