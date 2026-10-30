import { describe, expect, it } from "bun:test";
import { makeStringASubsequenceUsingCyclicIncrements as canMakeSubsequence } from ".";

describe("2825. Make String a Subsequence Using Cyclic Increments", () => {
	it("solves the examples from the problem statement", () => {
		expect(canMakeSubsequence("abc", "ad")).toBe(true);
		expect(canMakeSubsequence("zc", "ad")).toBe(true);
		expect(canMakeSubsequence("ab", "d")).toBe(false);
	});
});
