import { describe, expect, it } from "bun:test";
import { shiftDistanceBetweenTwoStrings as shiftDistance } from ".";

describe("3361. Shift Distance Between Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		const zeros = new Array<number>(24).fill(0);
		expect(
			shiftDistance(
				"abab",
				"baba",
				[100, 0, 0, ...zeros],
				[1, 100, 0, ...zeros],
			),
		).toBe(2);
		expect(
			shiftDistance(
				"leet",
				"code",
				new Array<number>(26).fill(1),
				new Array<number>(26).fill(1),
			),
		).toBe(31);
	});
});
