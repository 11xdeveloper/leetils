import { describe, expect, it } from "bun:test";
import { findMissingObservations as missingRolls } from ".";

describe("2028. Find Missing Observations", () => {
	it("solves the examples from the problem statement", () => {
		expect(missingRolls([3, 2, 4, 3], 4, 2)).toEqual([6, 6]);
		expect(missingRolls([1, 5, 6], 3, 4)).toEqual([3, 2, 2, 2]);
		expect(missingRolls([1, 2, 3, 4], 6, 4)).toEqual([]);
	});

	it("rejects a total that is too small", () => {
		expect(missingRolls([6, 6], 1, 1)).toEqual([]);
	});
});
