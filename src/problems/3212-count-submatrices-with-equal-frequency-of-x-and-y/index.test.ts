import { describe, expect, it } from "bun:test";
import { countSubmatricesWithEqualFrequencyOfXAndY as numberOfSubmatrices } from ".";

describe("3212. Count Submatrices With Equal Frequency of X and Y", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfSubmatrices([
				["X", "Y", "."],
				["Y", ".", "."],
			]),
		).toBe(3);
		expect(
			numberOfSubmatrices([
				["X", "X"],
				["X", "Y"],
			]),
		).toBe(0);
		expect(
			numberOfSubmatrices([
				[".", "."],
				[".", "."],
			]),
		).toBe(0);
	});
});
