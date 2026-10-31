import { describe, expect, it } from "bun:test";
import { minimumBishopMovesToReachTarget as minBishopMoves } from ".";

describe("4034. Minimum Bishop Moves to Reach Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(minBishopMoves([8, 1], [1, 8])).toBe(1);
		expect(minBishopMoves([4, 2], [1, 3])).toBe(2);
		expect(minBishopMoves([1, 1], [3, 4])).toBe(-1);
	});
});
