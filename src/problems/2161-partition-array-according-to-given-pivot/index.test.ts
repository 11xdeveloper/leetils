import { describe, expect, it } from "bun:test";
import { partitionArrayAccordingToGivenPivot as pivotArray } from ".";

describe("2161. Partition Array According to Given Pivot", () => {
	it("solves the examples from the problem statement", () => {
		expect(pivotArray([9, 12, 5, 10, 14, 3, 10], 10)).toEqual([
			9, 5, 3, 10, 10, 12, 14,
		]);
		expect(pivotArray([-3, 4, 3, 2], 2)).toEqual([-3, 2, 4, 3]);
	});
});
