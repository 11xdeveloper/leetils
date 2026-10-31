import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestPalindromicRearrangementII as smallestPalindrome } from ".";

/** Lists every distinct palindromic rearrangement in order. */
const byBruteForce = (s: string, k: number): string => {
	const found = new Set<string>();
	const permute = (prefix: string, rest: string): void => {
		if (rest === "") {
			if (prefix === [...prefix].reverse().join("")) found.add(prefix);
			return;
		}
		for (let i = 0; i < rest.length; i++)
			if (rest.indexOf(rest.charAt(i)) === i)
				permute(prefix + rest.charAt(i), rest.slice(0, i) + rest.slice(i + 1));
	};
	permute("", s);
	return [...found].sort()[k - 1] ?? "";
};

describe("3518. Smallest Palindromic Rearrangement II", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestPalindrome("abba", 2)).toBe("baab");
		expect(smallestPalindrome("aa", 2)).toBe("");
		expect(smallestPalindrome("bacab", 1)).toBe("abcba");
	});

	it("matches listing every rearrangement for random palindromes", () => {
		const random = createRandom(3518);
		for (let run = 0; run < 100; run++) {
			const half = random.string(random.int(1, 4), "abc");
			const middle = random.int(0, 1) ? random.string(1, "abc") : "";
			const s = half + middle + [...half].reverse().join("");
			const k = random.int(1, 15);
			expect(smallestPalindrome(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
