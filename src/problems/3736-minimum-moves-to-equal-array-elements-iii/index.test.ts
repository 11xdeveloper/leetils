import { describe, expect, it } from "bun:test";
import { minimumMovesToEqualArrayElementsIII as minMoves } from ".";

describe("3736. Minimum Moves to Equal Array Elements III", () => {
	it("solves the examples from the problem statement", () => {
		expect(minMoves([2, 1, 3])).toBe(3);
		expect(minMoves([4, 4, 5])).toBe(2);
	});
});
