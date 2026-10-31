import { describe, expect, it } from "bun:test";
import { smallestPalindromicRearrangementI as smallestPalindrome } from ".";

describe("3517. Smallest Palindromic Rearrangement I", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestPalindrome("z")).toBe("z");
		expect(smallestPalindrome("babab")).toBe("abbba");
		expect(smallestPalindrome("daccad")).toBe("acddca");
	});
});
