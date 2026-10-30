import { describe, expect, it } from "bun:test";
import { partitionStringIntoMinimumBeautifulSubstrings as minimumBeautifulSubstrings } from ".";

describe("2767. Partition String Into Minimum Beautiful Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumBeautifulSubstrings("1011")).toBe(2);
		expect(minimumBeautifulSubstrings("111")).toBe(3);
		expect(minimumBeautifulSubstrings("0")).toBe(-1);
	});
});
