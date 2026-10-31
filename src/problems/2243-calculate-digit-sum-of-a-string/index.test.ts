import { describe, expect, it } from "bun:test";
import { calculateDigitSumOfAString as digitSum } from ".";

describe("2243. Calculate Digit Sum of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(digitSum("11111222223", 3)).toBe("135");
		expect(digitSum("00000000", 3)).toBe("000");
	});
});
