import { describe, expect, it } from "bun:test";
import { minimumMovesToReachTargetScore as minMoves } from ".";

describe("2139. Minimum Moves to Reach Target Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves(5, 0)).toBe(4);
		expect(minMoves(19, 2)).toBe(7);
		expect(minMoves(10, 4)).toBe(4);
	});

	it("handles the largest targets", () => {
		expect(minMoves(1_000_000_000, 0)).toBe(999_999_999);
		expect(minMoves(1, 100)).toBe(0);
	});
});
