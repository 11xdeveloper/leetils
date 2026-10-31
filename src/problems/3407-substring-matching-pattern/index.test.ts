import { describe, expect, it } from "bun:test";
import { substringMatchingPattern as hasMatch } from ".";

describe("3407. Substring Matching Pattern", () => {
	it("solves the examples from the problem statement", () => {
		expect(hasMatch("leetcode", "ee*e")).toBeTrue();
		expect(hasMatch("car", "c*v")).toBeFalse();
		expect(hasMatch("luck", "u*")).toBeTrue();
	});
});
