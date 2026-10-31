import { describe, expect, it } from "bun:test";
import { minimumQueenMovesToReachTarget as minQueenMoves } from ".";

describe("4061. Minimum Queen Moves to Reach Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(minQueenMoves([8, 1], [1, 8])).toBe(1);
		expect(minQueenMoves([4, 2], [1, 3])).toBe(2);
		expect(minQueenMoves([1, 1], [1, 1])).toBe(0);
	});
});
