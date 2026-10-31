import { describe, expect, it } from "bun:test";
import { findFirstPalindromicStringInTheArray as firstPalindrome } from ".";

describe("2108. Find First Palindromic String in the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(firstPalindrome(["abc", "car", "ada", "racecar", "cool"])).toBe(
			"ada",
		);
		expect(firstPalindrome(["notapalindrome", "racecar"])).toBe("racecar");
		expect(firstPalindrome(["def", "ghi"])).toBe("");
	});
});
