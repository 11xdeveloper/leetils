import { describe, expect, it } from "bun:test";
import { smallestStableIndexI as firstStableIndex } from ".";

describe("3903. Smallest Stable Index I", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstStableIndex([5, 0, 1, 4], 3)).toBe(3);
		expect(firstStableIndex([3, 2, 1], 1)).toBe(-1);
		expect(firstStableIndex([0], 0)).toBe(0);
	});
});
