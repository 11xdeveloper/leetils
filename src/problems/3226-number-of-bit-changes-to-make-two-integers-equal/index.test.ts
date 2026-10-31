import { describe, expect, it } from "bun:test";
import { numberOfBitChangesToMakeTwoIntegersEqual as minChanges } from ".";

describe("3226. Number of Bit Changes to Make Two Integers Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minChanges(13, 4)).toBe(2);
		expect(minChanges(21, 21)).toBe(0);
		expect(minChanges(14, 13)).toBe(-1);
	});
});
