import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countPalindromicSubsequences as countPalindromes } from ".";

/** Checks every 5-index subsequence. */
const byBruteForce = (s: string): number => {
	let count = 0;
	const n = s.length;
	for (let a = 0; a < n; a++)
		for (let b = a + 1; b < n; b++)
			for (let c = b + 1; c < n; c++)
				for (let d = c + 1; d < n; d++)
					for (let e = d + 1; e < n; e++)
						if (s[a] === s[e] && s[b] === s[d]) count++;
	return count;
};

describe("2484. Count Palindromic Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countPalindromes("103301")).toBe(2);
		expect(countPalindromes("0000000")).toBe(21);
		expect(countPalindromes("9999900000")).toBe(2);
	});

	it("matches checking every subsequence on random strings", () => {
		const random = createRandom(2484);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 14), "012");
			expect(countPalindromes(s)).toBe(byBruteForce(s));
		}
	});
});
