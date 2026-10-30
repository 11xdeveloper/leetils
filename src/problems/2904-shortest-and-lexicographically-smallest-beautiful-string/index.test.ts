import { describe, expect, it } from "bun:test";
import { shortestAndLexicographicallySmallestBeautifulString as shortestBeautifulSubstring } from ".";

describe("2904. Shortest and Lexicographically Smallest Beautiful String", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestBeautifulSubstring("100011001", 3)).toBe("11001");
		expect(shortestBeautifulSubstring("1011", 2)).toBe("11");
		expect(shortestBeautifulSubstring("000", 1)).toBe("");
	});
});
