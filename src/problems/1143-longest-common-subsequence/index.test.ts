import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestCommonSubsequence } from ".";

/** Tries every subsequence of the first string, longest first. */
const byBruteForce = (text1: string, text2: string): number => {
	const isSubsequence = (s: string, of: string) => {
		let i = 0;
		for (const char of of) if (char === s[i]) i++;
		return i === s.length;
	};
	let best = 0;
	for (let mask = 0; mask < 2 ** text1.length; mask++) {
		const s = [...text1].filter((_, i) => mask & (1 << i)).join("");
		if (s.length > best && isSubsequence(s, text2)) best = s.length;
	}
	return best;
};

describe("1143. Longest Common Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
		expect(longestCommonSubsequence("abc", "abc")).toBe(3);
		expect(longestCommonSubsequence("abc", "def")).toBe(0);
	});

	it("handles strings of length 1000", () => {
		const text = "ab".repeat(500);
		expect(longestCommonSubsequence(text, "ba".repeat(500))).toBe(999);
		expect(longestCommonSubsequence(text, "a".repeat(1000))).toBe(500);
	});

	it("matches trying every subsequence on random inputs", () => {
		const random = createRandom(1143);
		for (let run = 0; run < 300; run++) {
			const text1 = random.string(random.int(1, 10), "abc");
			const text2 = random.string(random.int(1, 10), "abc");
			expect(longestCommonSubsequence(text1, text2)).toBe(
				byBruteForce(text1, text2),
			);
		}
	});
});
