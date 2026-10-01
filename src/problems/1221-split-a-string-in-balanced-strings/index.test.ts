import { describe, expect, it } from "bun:test";
import { splitAStringInBalancedStrings as balancedStringSplit } from ".";

describe("1221. Split a String in Balanced Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(balancedStringSplit("RLRRLLRLRL")).toBe(4);
		expect(balancedStringSplit("RLRRRLLRLL")).toBe(2);
		expect(balancedStringSplit("LLLLRRRR")).toBe(1);
	});

	it("splits alternating letters into pairs", () => {
		expect(balancedStringSplit("LR".repeat(500))).toBe(500);
	});
});
