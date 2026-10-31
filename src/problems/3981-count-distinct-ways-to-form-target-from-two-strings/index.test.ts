import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countDistinctWaysToFormTargetFromTwoStrings as interleaveCharacters } from ".";

/** Tries every choice for every letter. */
const byBruteForce = (word1: string, word2: string, target: string): number => {
	let count = 0;
	const go = (
		t: number,
		i: number,
		j: number,
		used1: boolean,
		used2: boolean,
	): void => {
		if (t === target.length) {
			if (used1 && used2) count++;
			return;
		}
		for (let x = i; x < word1.length; x++)
			if (word1[x] === target[t]) go(t + 1, x + 1, j, true, used2);
		for (let y = j; y < word2.length; y++)
			if (word2[y] === target[t]) go(t + 1, i, y + 1, used1, true);
	};
	go(0, 0, 0, false, false);
	return count;
};

describe("3981. Count Distinct Ways to Form Target from Two Strings", () => {
	it("solves the examples from the problem statement", () => {
		expect(interleaveCharacters("abc", "bac", "abc")).toBe(5);
		expect(interleaveCharacters("cd", "cd", "ccd")).toBe(4);
		expect(interleaveCharacters("xy", "xy", "xyxy")).toBe(2);
		expect(interleaveCharacters("ab", "cde", "ace")).toBe(1);
	});

	it("matches trying every choice on random words", () => {
		const random = createRandom(3981);
		for (let run = 0; run < 200; run++) {
			const word1 = random.string(random.int(1, 5), "ab");
			const word2 = random.string(random.int(1, 5), "ab");
			const target = random.string(random.int(1, 4), "ab");
			expect(interleaveCharacters(word1, word2, target)).toBe(
				byBruteForce(word1, word2, target),
			);
		}
	});
});
