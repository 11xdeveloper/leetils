import { describe, expect, it } from "bun:test";
import { countNumberOfHomogenousSubstrings as countHomogenous } from ".";

describe("1759. Count Number of Homogenous Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countHomogenous("abbcccaa")).toBe(13);
		expect(countHomogenous("xy")).toBe(2);
		expect(countHomogenous("zzzzz")).toBe(15);
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		expect(countHomogenous("a".repeat(100000))).toBe(
			5000050000 % 1_000_000_007,
		);
	});
});
