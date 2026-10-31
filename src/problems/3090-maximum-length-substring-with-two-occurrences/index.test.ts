import { describe, expect, it } from "bun:test";
import { maximumLengthSubstringWithTwoOccurrences as maximumLengthSubstring } from ".";

describe("3090. Maximum Length Substring With Two Occurrences", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumLengthSubstring("bcbbbcba")).toBe(4);
		expect(maximumLengthSubstring("aaaa")).toBe(2);
	});
});
