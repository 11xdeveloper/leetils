import { describe, expect, it } from "bun:test";
import { harshadNumber as sumOfTheDigitsOfHarshadNumber } from ".";

describe("3099. Harshad Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumOfTheDigitsOfHarshadNumber(18)).toBe(9);
		expect(sumOfTheDigitsOfHarshadNumber(23)).toBe(-1);
	});
});
