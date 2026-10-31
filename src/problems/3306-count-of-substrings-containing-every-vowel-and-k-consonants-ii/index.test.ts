import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countOfSubstringsContainingEveryVowelAndKConsonantsII as countOfSubstrings } from ".";

/** Checks every substring. */
const byBruteForce = (word: string, k: number): number => {
	let count = 0;
	for (let i = 0; i < word.length; i++)
		for (let j = i + 1; j <= word.length; j++) {
			const sub = word.slice(i, j);
			const consonants = [...sub].filter((c) => !"aeiou".includes(c)).length;
			if (consonants === k && [..."aeiou"].every((v) => sub.includes(v)))
				count++;
		}
	return count;
};

describe("3306. Count of Substrings Containing Every Vowel and K Consonants II", () => {
	it("solves the examples from the problem statement", () => {
		expect(countOfSubstrings("aeioqq", 1)).toBe(0);
		expect(countOfSubstrings("aeiou", 0)).toBe(1);
		expect(countOfSubstrings("ieaouqqieaouqq", 1)).toBe(3);
	});

	it("matches checking every substring on random words", () => {
		const random = createRandom(3306);
		for (let run = 0; run < 200; run++) {
			const word = random.string(random.int(5, 16), "aeioubc");
			const k = random.int(0, 3);
			expect(countOfSubstrings(word, k)).toBe(byBruteForce(word, k));
		}
	});
});
