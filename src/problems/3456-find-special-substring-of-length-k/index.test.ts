import { describe, expect, it } from "bun:test";
import { findSpecialSubstringOfLengthK as hasSpecialSubstring } from ".";

describe("3456. Find Special Substring of Length K", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasSpecialSubstring("aaabaaa", 3)).toBeTrue();
		expect(hasSpecialSubstring("abc", 2)).toBeFalse();
	});
});
