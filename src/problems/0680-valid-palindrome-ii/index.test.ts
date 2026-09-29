import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validPalindromeII as validPalindrome } from ".";

const isPalindrome = (s: string): boolean => s === [...s].reverse().join("");

describe("680. Valid Palindrome II", () => {
	it("solves the examples from the problem statement", () => {
		expect(validPalindrome("aba")).toBeTrue();
		expect(validPalindrome("abca")).toBeTrue();
		expect(validPalindrome("abc")).toBeFalse();
	});

	it("matches trying every deletion on random strings", () => {
		const random = createRandom(680);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 10), "abc");
			const expected =
				isPalindrome(s) ||
				[...s].some((_, i) => isPalindrome(s.slice(0, i) + s.slice(i + 1)));
			expect(validPalindrome(s)).toBe(expected);
		}
	});
});
