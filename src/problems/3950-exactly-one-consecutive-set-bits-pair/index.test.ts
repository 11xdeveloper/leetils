import { describe, expect, it } from "bun:test";
import { exactlyOneConsecutiveSetBitsPair as consecutiveSetBits } from ".";

describe("3950. Exactly One Consecutive Set Bits Pair", () => {
	it("solves the examples from the problem statement", () => {
		expect(consecutiveSetBits(6)).toBeTrue();
		expect(consecutiveSetBits(5)).toBeFalse();
	});

	it("rejects runs of three", () => {
		expect(consecutiveSetBits(7)).toBeFalse();
		expect(consecutiveSetBits(0)).toBeFalse();
	});
});
