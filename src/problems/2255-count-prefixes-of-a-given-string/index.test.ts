import { describe, expect, it } from "bun:test";
import { countPrefixesOfAGivenString as countPrefixes } from ".";

describe("2255. Count Prefixes of a Given String", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPrefixes(["a", "b", "c", "ab", "bc", "abc"], "abc")).toBe(3);
		expect(countPrefixes(["a", "a"], "aa")).toBe(2);
	});
});
