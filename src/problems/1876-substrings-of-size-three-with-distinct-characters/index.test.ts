import { describe, expect, it } from "bun:test";
import { substringsOfSizeThreeWithDistinctCharacters as countGoodSubstrings } from ".";

describe("1876. Substrings of Size Three with Distinct Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodSubstrings("xyzzaz")).toBe(1);
		expect(countGoodSubstrings("aababcabc")).toBe(4);
	});
});
