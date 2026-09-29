import { describe, expect, it } from "bun:test";
import { longestAbsoluteFilePath } from ".";

describe("388. Longest Absolute File Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestAbsoluteFilePath("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"),
		).toBe(20);
		expect(
			longestAbsoluteFilePath(
				"dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext",
			),
		).toBe(32);
		expect(longestAbsoluteFilePath("a")).toBe(0);
		expect(longestAbsoluteFilePath("file1.txt\nfile2.txt\nlongfile.txt")).toBe(
			12,
		);
	});

	it("allows spaces in names and files at the top level", () => {
		expect(longestAbsoluteFilePath("my dir\n\tmy file.txt")).toBe(18);
	});

	it("resets to shallower depths after a deep path", () => {
		expect(longestAbsoluteFilePath("a\n\tb\n\t\tc\n\t\t\td\na.txt")).toBe(5);
	});
});
