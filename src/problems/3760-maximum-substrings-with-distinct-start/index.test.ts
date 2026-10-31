import { describe, expect, it } from "bun:test";
import { maximumSubstringsWithDistinctStart as maxDistinct } from ".";

describe("3760. Maximum Substrings With Distinct Start", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDistinct("abab")).toBe(2);
		expect(maxDistinct("abcd")).toBe(4);
		expect(maxDistinct("aaaa")).toBe(1);
	});
});
