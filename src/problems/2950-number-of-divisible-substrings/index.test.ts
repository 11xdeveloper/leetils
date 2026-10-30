import { describe, expect, it } from "bun:test";
import { numberOfDivisibleSubstrings as countDivisibleSubstrings } from ".";

describe("2950. Number of Divisible Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(countDivisibleSubstrings("asdf")).toBe(6);
		expect(countDivisibleSubstrings("bdh")).toBe(4);
		expect(countDivisibleSubstrings("abcd")).toBe(6);
	});
});
