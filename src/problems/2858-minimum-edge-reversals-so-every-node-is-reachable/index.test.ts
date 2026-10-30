import { describe, expect, it } from "bun:test";
import { minimumEdgeReversalsSoEveryNodeIsReachable as minEdgeReversals } from ".";

describe("2858. Minimum Edge Reversals So Every Node Is Reachable", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minEdgeReversals(4, [
				[2, 0],
				[2, 1],
				[1, 3],
			]),
		).toEqual([1, 1, 0, 2]);
		expect(
			minEdgeReversals(3, [
				[1, 2],
				[2, 0],
			]),
		).toEqual([2, 0, 1]);
	});
});
