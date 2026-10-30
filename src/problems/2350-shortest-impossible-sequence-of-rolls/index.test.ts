import { describe, expect, it } from "bun:test";
import { shortestImpossibleSequenceOfRolls as shortestSequence } from ".";

describe("2350. Shortest Impossible Sequence of Rolls", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestSequence([4, 2, 1, 2, 3, 3, 2, 4, 1], 4)).toBe(3);
		expect(shortestSequence([1, 1, 2, 2], 2)).toBe(2);
		expect(shortestSequence([1, 1, 3, 2, 2, 2, 3, 3], 4)).toBe(1);
	});
});
