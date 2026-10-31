import { describe, expect, it } from "bun:test";
import { checkBalancedString as isBalanced } from ".";

describe("3340. Check Balanced String", () => {
	it("solves the examples from the problem statement", () => {
		expect(isBalanced("1234")).toBeFalse();
		expect(isBalanced("24123")).toBeTrue();
	});
});
