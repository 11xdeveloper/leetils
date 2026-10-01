import { describe, expect, it } from "bun:test";
import { sumOfDigitsOfStringAfterConvert as getLucky } from ".";

describe("1945. Sum of Digits of String After Convert", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLucky("iiii", 1)).toBe(36);
		expect(getLucky("leetcode", 2)).toBe(6);
		expect(getLucky("zbax", 2)).toBe(8);
	});
});
