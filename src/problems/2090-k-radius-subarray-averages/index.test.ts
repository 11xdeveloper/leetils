import { describe, expect, it } from "bun:test";
import { kRadiusSubarrayAverages as getAverages } from ".";

describe("2090. K Radius Subarray Averages", () => {
	it("solves the examples from the problem statement", () => {
		expect(getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3)).toEqual([
			-1, -1, -1, 5, 4, 4, -1, -1, -1,
		]);
		expect(getAverages([100000], 0)).toEqual([100000]);
		expect(getAverages([8], 100000)).toEqual([-1]);
	});
});
