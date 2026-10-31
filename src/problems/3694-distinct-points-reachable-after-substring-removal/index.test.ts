import { describe, expect, it } from "bun:test";
import { distinctPointsReachableAfterSubstringRemoval as distinctPoints } from ".";

describe("3694. Distinct Points Reachable After Substring Removal", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctPoints("LUL", 1)).toBe(2);
		expect(distinctPoints("UDLR", 4)).toBe(1);
		expect(distinctPoints("UU", 1)).toBe(1);
	});
});
