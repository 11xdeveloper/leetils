import { describe, expect, it } from "bun:test";
import { minimumDistanceToTheTargetElement as getMinDistance } from ".";

describe("1848. Minimum Distance to the Target Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMinDistance([1, 2, 3, 4, 5], 5, 3)).toBe(1);
		expect(getMinDistance([1], 1, 0)).toBe(0);
		expect(getMinDistance([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1, 0)).toBe(0);
	});
});
