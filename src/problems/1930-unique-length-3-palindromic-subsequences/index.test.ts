import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { uniqueLength3PalindromicSubsequences as countPalindromicSubsequence } from ".";

describe("1930. Unique Length-3 Palindromic Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPalindromicSubsequence("aabca")).toBe(3);
		expect(countPalindromicSubsequence("adc")).toBe(0);
		expect(countPalindromicSubsequence("bbcbaba")).toBe(4);
	});

	it("matches collecting every palindrome on random strings", () => {
		const random = createRandom(1930);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(3, 12), "abc");
			const found = new Set<string>();
			for (let i = 0; i < s.length; i++) {
				for (let j = i + 1; j < s.length; j++)
					for (let k = j + 1; k < s.length; k++)
						if (s[i] === s[k]) found.add(`${s[i]}${s[j]}`);
			}
			expect(countPalindromicSubsequence(s)).toBe(found.size);
		}
	});
});
