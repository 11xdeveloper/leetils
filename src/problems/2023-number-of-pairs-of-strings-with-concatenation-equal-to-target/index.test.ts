import { describe, expect, it } from "bun:test";
import { numberOfPairsOfStringsWithConcatenationEqualToTarget as concatenationPairs } from ".";

describe("2023. Number of Pairs of Strings With Concatenation Equal to Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(concatenationPairs(["777", "7", "77", "77"], "7777")).toBe(4);
		expect(concatenationPairs(["123", "4", "12", "34"], "1234")).toBe(2);
		expect(concatenationPairs(["1", "1", "1"], "11")).toBe(6);
	});

	it("doesn't pair a string with itself", () => {
		expect(concatenationPairs(["12", "3"], "1212")).toBe(0);
	});
});
