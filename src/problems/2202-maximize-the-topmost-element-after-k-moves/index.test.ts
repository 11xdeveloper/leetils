import { describe, expect, it } from "bun:test";
import { maximizeTheTopmostElementAfterKMoves as maximumTop } from ".";

describe("2202. Maximize the Topmost Element After K Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTop([5, 2, 2, 4, 0, 6], 4)).toBe(5);
		expect(maximumTop([2], 1)).toBe(-1);
	});

	it("handles small and huge k", () => {
		expect(maximumTop([3, 9], 0)).toBe(3);
		expect(maximumTop([3, 9], 1)).toBe(9);
		expect(maximumTop([3, 9], 2)).toBe(3);
		expect(maximumTop([3, 9], 1_000_000_000)).toBe(9);
		expect(maximumTop([7], 2)).toBe(7);
	});
});
