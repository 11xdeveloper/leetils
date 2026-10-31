import { describe, expect, it } from "bun:test";
import { maximizeYsumByPickingATripletOfDistinctXvalues as maxSumDistinctTriplet } from ".";

describe("3572. Maximize Y‑Sum by Picking a Triplet of Distinct X‑Values", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSumDistinctTriplet([1, 2, 1, 3, 2], [5, 3, 4, 6, 2])).toBe(14);
		expect(maxSumDistinctTriplet([1, 2, 1, 2], [4, 5, 6, 7])).toBe(-1);
	});
});
