import { describe, expect, it } from "bun:test";
import { addBoldTagInString as addBoldTag } from ".";

describe("616. Add Bold Tag in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(addBoldTag("abcxyz123", ["abc", "123"])).toBe(
			"<b>abc</b>xyz<b>123</b>",
		);
		expect(addBoldTag("aaabbb", ["aa", "b"])).toBe("<b>aaabbb</b>");
	});

	it("merges overlapping and adjacent matches, and leaves unmatched text alone", () => {
		expect(addBoldTag("abcdef", ["abc", "cd"])).toBe("<b>abcd</b>ef");
		expect(addBoldTag("abcdef", ["ab", "cd"])).toBe("<b>abcd</b>ef");
		expect(addBoldTag("abcdef", ["ab", "de"])).toBe("<b>ab</b>c<b>de</b>f");
		expect(addBoldTag("abc", [])).toBe("abc");
		expect(addBoldTag("abc", ["abcd"])).toBe("abc");
	});
});
