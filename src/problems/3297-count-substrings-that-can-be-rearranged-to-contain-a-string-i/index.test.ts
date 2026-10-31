import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubstringsThatCanBeRearrangedToContainAStringI as validSubstringCount } from ".";

/** Checks every substring's letter counts. */
const byBruteForce = (word1: string, word2: string): number => {
	const need = new Map<string, number>();
	for (const c of word2) need.set(c, (need.get(c) ?? 0) + 1);
	let count = 0;
	for (let i = 0; i < word1.length; i++) {
		const have = new Map<string, number>();
		for (let j = i; j < word1.length; j++) {
			const c = word1.charAt(j);
			have.set(c, (have.get(c) ?? 0) + 1);
			if ([...need].every(([letter, n]) => (have.get(letter) ?? 0) >= n))
				count++;
		}
	}
	return count;
};

describe("3297. Count Substrings That Can Be Rearranged to Contain a String I", () => {
	it("solves the examples from the problem statement", () => {
		expect(validSubstringCount("bcca", "abc")).toBe(1);
		expect(validSubstringCount("abcabc", "abc")).toBe(10);
		expect(validSubstringCount("abcabc", "aaabc")).toBe(0);
	});

	it("matches checking every substring on random words", () => {
		const random = createRandom(3297);
		for (let run = 0; run < 300; run++) {
			const word1 = random.string(random.int(1, 12), "abc");
			const word2 = random.string(random.int(1, 4), "abc");
			expect(validSubstringCount(word1, word2)).toBe(
				byBruteForce(word1, word2),
			);
		}
	});
});
