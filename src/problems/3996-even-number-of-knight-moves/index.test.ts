import { describe, expect, it } from "bun:test";
import { evenNumberOfKnightMoves as canReach } from ".";

describe("3996. Even Number of Knight Moves", () => {
	it("solves the examples from the problem statement", () => {
		expect(canReach([1, 1], [2, 2])).toBeTrue();
		expect(canReach([4, 5], [6, 6])).toBeFalse();
	});
});
