import { describe, expect, it } from "bun:test";
import { tagValidator as isValid } from ".";

describe("591. Tag Validator", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isValid("<DIV>This is the first line <![CDATA[<div>]]></DIV>"),
		).toBeTrue();
		expect(
			isValid("<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"),
		).toBeTrue();
		expect(isValid("<A>  <B> </A>   </B>")).toBeFalse();
	});

	it("accepts nested tags, text and CDATA", () => {
		for (const code of [
			"<A></A>",
			"<A><B></B><C>text</C></A>",
			"<ABCDEFGHI>x</ABCDEFGHI>",
			"<A><![CDATA[</A>]]></A>",
			"<A>></A>",
		]) {
			expect(isValid(code)).toBeTrue();
		}
	});

	it("rejects invalid code", () => {
		for (const code of [
			"<DIV>  div tag is not closed  <DIV>",
			"<DIV>  unmatched <  </DIV>",
			"<DIV> closed tags with invalid tag name  <b>123</b> </DIV>",
			"<DIV> unmatched tags with invalid tag name  </1234567890> and <CDATA[[]]>  </DIV>",
			"<DIV>  unmatched start tag <B>  and unmatched end tag </C>  </DIV>",
			"<ABCDEFGHIJ>x</ABCDEFGHIJ>",
			"<A></A><B></B>",
			"<A></A>text",
			"text<A></A>",
			"<![CDATA[wahaha]]]><![CDATA[]> wahaha]]>",
			"<A><![CDATA[unclosed</A>",
			"<A",
			"<>",
			"<A></A",
		]) {
			expect(isValid(code)).toBeFalse();
		}
	});
});
