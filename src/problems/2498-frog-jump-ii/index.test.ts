import { describe, expect, it } from "bun:test";
import { frogJumpII as maxJump } from ".";

describe("2498. Frog Jump II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxJump([0, 2, 5, 6, 7])).toBe(5);
		expect(maxJump([0, 3, 9])).toBe(9);
	});
});
