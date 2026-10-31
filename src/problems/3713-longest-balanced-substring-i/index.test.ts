import { describe, expect, it } from "bun:test";
import { longestBalancedSubstringI as longestBalanced } from ".";

describe("3713. Longest Balanced Substring I", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestBalanced("abbac")).toBe(4);
		expect(longestBalanced("zzabccy")).toBe(4);
		expect(longestBalanced("aba")).toBe(2);
	});
});
