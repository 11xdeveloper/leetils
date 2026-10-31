import { describe, expect, it } from "bun:test";
import { findTimeRequiredToEliminateBacterialStrains as minEliminationTime } from ".";

describe("3506. Find Time Required to Eliminate Bacterial Strains", () => {
	it("solves the examples from the problem statement", () => {
		expect(minEliminationTime([10, 4, 5], 2)).toBe(12);
		expect(minEliminationTime([10, 4], 5)).toBe(15);
		expect(minEliminationTime([7], 3)).toBe(7);
	});
});
