import { describe, expect, it } from "bun:test";
import { removeComments } from ".";

describe("722. Remove Comments", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			removeComments([
				"/*Test program */",
				"int main()",
				"{ ",
				"  // variable declaration ",
				"int a, b, c;",
				"/* This is a test",
				"   multiline  ",
				"   comment for ",
				"   testing */",
				"a = b + c;",
				"}",
			]),
		).toEqual(["int main()", "{ ", "  ", "int a, b, c;", "a = b + c;", "}"]);
		expect(removeComments(["a/*comment", "line", "more_comment*/b"])).toEqual([
			"ab",
		]);
	});

	it("doesn't let the / of */ start a new comment", () => {
		expect(removeComments(["a/*/b//*c", "blank", "d*/e*//f"])).toEqual(["ae*"]);
	});

	it("ignores // inside block comments and /* inside line comments", () => {
		expect(removeComments(["a/* // */b", "c// /* d", "e"])).toEqual([
			"ab",
			"c",
			"e",
		]);
	});
});
