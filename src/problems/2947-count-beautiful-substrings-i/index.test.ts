import { describe, expect, it } from "bun:test";
import { countBeautifulSubstringsI as beautifulSubstrings } from ".";

describe("2947. Count Beautiful Substrings I", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulSubstrings("baeyh", 2)).toBe(2);
		expect(beautifulSubstrings("abba", 1)).toBe(3);
		expect(beautifulSubstrings("bcdf", 1)).toBe(0);
	});
});
