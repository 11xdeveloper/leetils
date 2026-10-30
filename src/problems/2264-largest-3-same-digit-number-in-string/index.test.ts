import { describe, expect, it } from "bun:test";
import { largest3SameDigitNumberInString as largestGoodInteger } from ".";

describe("2264. Largest 3-Same-Digit Number in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestGoodInteger("6777133339")).toBe("777");
		expect(largestGoodInteger("2300019")).toBe("000");
		expect(largestGoodInteger("42352338")).toBe("");
	});
});
