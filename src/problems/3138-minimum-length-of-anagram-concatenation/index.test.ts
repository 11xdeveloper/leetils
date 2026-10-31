import { describe, expect, it } from "bun:test";
import { minimumLengthOfAnagramConcatenation as minAnagramLength } from ".";

describe("3138. Minimum Length of Anagram Concatenation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minAnagramLength("abba")).toBe(2);
		expect(minAnagramLength("cdef")).toBe(4);
	});

	it("handles repeated letters", () => {
		expect(minAnagramLength("aaaa")).toBe(1);
		expect(minAnagramLength("abcbcacab")).toBe(3);
	});
});
