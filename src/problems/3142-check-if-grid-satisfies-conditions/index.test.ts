import { describe, expect, it } from "bun:test";
import { checkIfGridSatisfiesConditions as satisfiesConditions } from ".";

describe("3142. Check if Grid Satisfies Conditions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			satisfiesConditions([
				[1, 0, 2],
				[1, 0, 2],
			]),
		).toBeTrue();
		expect(
			satisfiesConditions([
				[1, 1, 1],
				[0, 0, 0],
			]),
		).toBeFalse();
		expect(satisfiesConditions([[1], [2], [3]])).toBeFalse();
	});
});
