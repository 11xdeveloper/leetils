import { describe, expect, it } from "bun:test";
import { existenceOfASubstringInAStringAndItsReverse as isSubstringPresent } from ".";

describe("3083. Existence of a Substring in a String and Its Reverse", () => {
	it("solves the examples from the problem statement", () => {
		expect(isSubstringPresent("leetcode")).toBeTrue();
		expect(isSubstringPresent("abcba")).toBeTrue();
		expect(isSubstringPresent("abcd")).toBeFalse();
	});
});
