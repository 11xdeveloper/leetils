import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lexicographicallySmallestPalindromicPermutationGreaterThanTarget as lexPalindromicPermutation } from ".";

/** Tries every permutation. */
const byBruteForce = (s: string, target: string): string => {
	let best = "";
	const go = (prefix: string, rest: string): void => {
		if (rest.length === 0) {
			if (
				prefix === [...prefix].reverse().join("") &&
				prefix > target &&
				(best === "" || prefix < best)
			)
				best = prefix;
			return;
		}
		for (let i = 0; i < rest.length; i++)
			go(prefix + rest[i], rest.slice(0, i) + rest.slice(i + 1));
	};
	go("", s);
	return best;
};

describe("3734. Lexicographically Smallest Palindromic Permutation Greater Than Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(lexPalindromicPermutation("baba", "abba")).toBe("baab");
		expect(lexPalindromicPermutation("baba", "bbaa")).toBe("");
		expect(lexPalindromicPermutation("abc", "abb")).toBe("");
		expect(lexPalindromicPermutation("aac", "abb")).toBe("aca");
	});

	it("matches trying every permutation on random strings", () => {
		const random = createRandom(3734);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const [s, target] = [random.string(n, "abc"), random.string(n, "abc")];
			expect(lexPalindromicPermutation(s, target)).toBe(
				byBruteForce(s, target),
			);
		}
	});
});
