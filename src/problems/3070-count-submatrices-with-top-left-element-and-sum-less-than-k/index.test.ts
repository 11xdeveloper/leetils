import { describe, expect, it } from "bun:test";
import { countSubmatricesWithTopLeftElementAndSumLessThanK as countSubmatrices } from ".";

describe("3070. Count Submatrices with Top-Left Element and Sum Less Than k", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countSubmatrices(
				[
					[7, 6, 3],
					[6, 6, 1],
				],
				18,
			),
		).toBe(4);
		expect(
			countSubmatrices(
				[
					[7, 2, 9],
					[1, 5, 0],
					[2, 6, 6],
				],
				20,
			),
		).toBe(6);
	});
});
