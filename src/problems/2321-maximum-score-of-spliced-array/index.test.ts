import { describe, expect, it } from "bun:test";
import { maximumScoreOfSplicedArray as maximumsSplicedArray } from ".";

describe("2321. Maximum Score of Spliced Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumsSplicedArray([60, 60, 60], [10, 90, 10])).toBe(210);
		expect(
			maximumsSplicedArray([20, 40, 20, 70, 30], [50, 20, 50, 40, 20]),
		).toBe(220);
		expect(maximumsSplicedArray([7, 11, 13], [1, 1, 1])).toBe(31);
	});
});
