import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { breakAPalindrome } from ".";

/** Tries every single-letter change. */
const byBruteForce = (s: string): string => {
	let best: string | undefined;
	for (let i = 0; i < s.length; i++) {
		for (const char of "abcdefghijklmnopqrstuvwxyz") {
			if (char === s[i]) continue;
			const t = s.slice(0, i) + char + s.slice(i + 1);
			if (t !== [...t].reverse().join("") && (best === undefined || t < best))
				best = t;
		}
	}
	return best ?? "";
};

describe("1328. Break a Palindrome", () => {
	it("solves the examples from the problem statement", () => {
		expect(breakAPalindrome("abccba")).toBe("aaccba");
		expect(breakAPalindrome("a")).toBe("");
	});

	it("handles all-a palindromes and an odd middle", () => {
		expect(breakAPalindrome("aa")).toBe("ab");
		expect(breakAPalindrome("aba")).toBe("abb");
	});

	it("matches trying every change on random palindromes", () => {
		const random = createRandom(1328);
		for (let run = 0; run < 300; run++) {
			const half = random.string(random.int(0, 4), "abc");
			const middle = random.string(random.int(0, 1), "abc");
			const s = half + middle + [...half].reverse().join("");
			if (s === "") continue;
			expect(breakAPalindrome(s)).toBe(byBruteForce(s));
		}
	});
});
