import { describe, expect, it } from "bun:test";
import { checkIfNumberHasEqualDigitCountAndDigitValue as digitCount } from ".";

describe("2283. Check if Number Has Equal Digit Count and Digit Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(digitCount("1210")).toBeTrue();
		expect(digitCount("030")).toBeFalse();
	});
});
