import { describe, expect, it } from "bun:test";
import { largestOddNumberInString as largestOddNumber } from ".";

describe("1903. Largest Odd Number in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestOddNumber("52")).toBe("5");
		expect(largestOddNumber("4206")).toBe("");
		expect(largestOddNumber("35427")).toBe("35427");
	});
});
