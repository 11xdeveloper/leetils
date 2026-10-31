import { describe, expect, it } from "bun:test";
import { smallestStableIndexII as firstStableIndex } from ".";

describe("3904. Smallest Stable Index II", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstStableIndex([5, 0, 1, 4], 3)).toBe(3);
		expect(firstStableIndex([3, 2, 1], 1)).toBe(-1);
		expect(firstStableIndex([0], 0)).toBe(0);
	});
});
