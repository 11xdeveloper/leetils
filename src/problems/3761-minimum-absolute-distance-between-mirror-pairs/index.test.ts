import { describe, expect, it } from "bun:test";
import { minimumAbsoluteDistanceBetweenMirrorPairs as minMirrorPairDistance } from ".";

describe("3761. Minimum Absolute Distance Between Mirror Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMirrorPairDistance([12, 21, 45, 33, 54])).toBe(1);
		expect(minMirrorPairDistance([120, 21])).toBe(1);
		expect(minMirrorPairDistance([21, 120])).toBe(-1);
	});
});
