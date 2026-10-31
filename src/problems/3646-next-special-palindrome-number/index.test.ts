import { describe, expect, it } from "bun:test";
import { nextSpecialPalindromeNumber as specialPalindrome } from ".";

/** Checks numbers one at a time. */
const byBruteForce = (n: number): number => {
	for (let x = n + 1; ; x++) {
		const s = String(x);
		if (s !== [...s].reverse().join("")) continue;
		const counts = new Map<string, number>();
		for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
		if ([...counts].every(([d, c]) => Number(d) === c)) return x;
	}
};

describe("3646. Next Special Palindrome Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(specialPalindrome(2)).toBe(22);
		expect(specialPalindrome(33)).toBe(212);
	});

	it("matches checking numbers one at a time", () => {
		for (const n of [0, 1, 21, 22, 211, 212, 1000, 4444, 22000, 45000, 333333])
			expect(specialPalindrome(n)).toBe(byBruteForce(n));
	});

	it("handles the largest inputs", () => {
		expect(specialPalindrome(1e15)).toBe(2666888888886662);
	});
});
