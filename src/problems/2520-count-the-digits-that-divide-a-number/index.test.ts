import { describe, expect, it } from "bun:test";
import { countTheDigitsThatDivideANumber as countDigits } from ".";

describe("2520. Count the Digits That Divide a Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDigits(7)).toBe(1);
		expect(countDigits(121)).toBe(2);
		expect(countDigits(1248)).toBe(4);
	});
});
