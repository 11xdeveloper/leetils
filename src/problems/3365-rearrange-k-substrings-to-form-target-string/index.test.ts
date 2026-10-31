import { describe, expect, it } from "bun:test";
import { rearrangeKSubstringsToFormTargetString as isPossibleToRearrange } from ".";

describe("3365. Rearrange K Substrings to Form Target String", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPossibleToRearrange("abcd", "cdab", 2)).toBeTrue();
		expect(isPossibleToRearrange("aabbcc", "bbaacc", 3)).toBeTrue();
		expect(isPossibleToRearrange("aabbcc", "bbaacc", 2)).toBeFalse();
	});
});
