import { describe, expect, it } from "bun:test";
import { stoneRemovalGame as canAliceWin } from ".";

describe("3360. Stone Removal Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(canAliceWin(12)).toBeTrue();
		expect(canAliceWin(1)).toBeFalse();
	});

	it("handles the boundaries", () => {
		expect(canAliceWin(10)).toBeTrue();
		expect(canAliceWin(19)).toBeFalse();
		expect(canAliceWin(27)).toBeTrue();
	});
});
