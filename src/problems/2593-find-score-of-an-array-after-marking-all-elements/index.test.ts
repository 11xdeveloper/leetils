import { describe, expect, it } from "bun:test";
import { findScoreOfAnArrayAfterMarkingAllElements as findScore } from ".";

describe("2593. Find Score of an Array After Marking All Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(findScore([2, 1, 3, 4, 5, 2])).toBe(7);
		expect(findScore([2, 3, 5, 1, 3, 2])).toBe(5);
	});
});
