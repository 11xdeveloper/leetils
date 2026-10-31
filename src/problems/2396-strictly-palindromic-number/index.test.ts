import { describe, expect, it } from "bun:test";
import { strictlyPalindromicNumber as isStrictlyPalindromic } from ".";

describe("2396. Strictly Palindromic Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(isStrictlyPalindromic(9)).toBeFalse();
		expect(isStrictlyPalindromic(4)).toBeFalse();
	});

	it("matches checking every base", () => {
		for (let n = 4; n <= 38; n++) {
			let palindromic = true;
			for (let base = 2; base <= n - 2; base++) {
				const digits = n.toString(base);
				if (digits !== [...digits].reverse().join("")) palindromic = false;
			}
			expect(isStrictlyPalindromic(n)).toBe(palindromic);
		}
	});
});
