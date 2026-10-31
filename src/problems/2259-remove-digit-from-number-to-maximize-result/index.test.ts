import { describe, expect, it } from "bun:test";
import { removeDigitFromNumberToMaximizeResult as removeDigit } from ".";

describe("2259. Remove Digit From Number to Maximize Result", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeDigit("123", "3")).toBe("12");
		expect(removeDigit("1231", "1")).toBe("231");
		expect(removeDigit("551", "5")).toBe("51");
	});
});
