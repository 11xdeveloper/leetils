import { describe, expect, it } from "bun:test";
import { maximumNumberOfJumpsToReachTheLastIndex as maximumJumps } from ".";

describe("2770. Maximum Number of Jumps to Reach the Last Index", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumJumps([1, 3, 6, 4, 1, 2], 2)).toBe(3);
		expect(maximumJumps([1, 3, 6, 4, 1, 2], 3)).toBe(5);
		expect(maximumJumps([1, 3, 6, 4, 1, 2], 0)).toBe(-1);
	});
});
