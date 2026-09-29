import { describe, expect, it } from "bun:test";
import { findTheIndexOfTheFirstOccurrenceInAString as strStr } from ".";

/** Every string made of `alphabet` up to `maxLength` characters long. */
const stringsUpTo = (alphabet: string[], maxLength: number): string[] => {
	const all = [""];
	let previous = [""];
	for (let length = 1; length <= maxLength; length++) {
		previous = previous.flatMap((s) => alphabet.map((char) => s + char));
		all.push(...previous);
	}
	return all;
};

describe("28. Find the Index of the First Occurrence in a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(strStr("sadbutsad", "sad")).toBe(0);
		expect(strStr("leetcode", "leeto")).toBe(-1);
	});

	it("finds needles at the end or equal to the haystack", () => {
		expect(strStr("hello", "llo")).toBe(2);
		expect(strStr("abc", "abc")).toBe(0);
	});

	it("returns -1 when the needle is longer than the haystack", () => {
		expect(strStr("ab", "abc")).toBe(-1);
	});

	it("keeps partial matches after a mismatch", () => {
		expect(strStr("aabaaabaaac", "aabaaac")).toBe(4);
		expect(strStr("mississippi", "issip")).toBe(4);
		expect(strStr("ababcaababcaabc", "ababcaabc")).toBe(6);
	});

	it("handles long repetitive inputs", () => {
		expect(strStr(`${"a".repeat(10_000)}b`, `${"a".repeat(5000)}b`)).toBe(5000);
	});

	it("agrees with String.prototype.indexOf on every small input", () => {
		const haystacks = stringsUpTo(["a", "b"], 7);
		const needles = stringsUpTo(["a", "b"], 4).filter((s) => s !== "");
		for (const haystack of haystacks) {
			for (const needle of needles) {
				expect(strStr(haystack, needle)).toBe(haystack.indexOf(needle));
			}
		}
	});
});
