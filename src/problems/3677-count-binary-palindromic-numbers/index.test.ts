import { describe, expect, it } from "bun:test";
import { countBinaryPalindromicNumbers as countBinaryPalindromes } from ".";

describe("3677. Count Binary Palindromic Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countBinaryPalindromes(9)).toBe(6);
		expect(countBinaryPalindromes(0)).toBe(1);
	});

	it("matches checking every number", () => {
		let count = 0;
		for (let n = 0; n <= 2000; n++) {
			const b = n.toString(2);
			if (b === [...b].reverse().join("")) count++;
			expect(countBinaryPalindromes(n)).toBe(count);
		}
	});
});
