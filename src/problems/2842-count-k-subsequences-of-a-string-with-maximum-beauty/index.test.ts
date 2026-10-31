import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countKSubsequencesOfAStringWithMaximumBeauty as countKSubsequencesWithMaxBeauty } from ".";

/** Checks every subsequence of `k` distinct letters. */
const byBruteForce = (s: string, k: number): number => {
	const freq = new Map<string, number>();
	for (const c of s) freq.set(c, (freq.get(c) ?? 0) + 1);
	let best = -1;
	let count = 0;
	for (let mask = 0; mask < 1 << s.length; mask++) {
		const letters: string[] = [];
		for (let i = 0; i < s.length; i++)
			if ((mask >> i) & 1) letters.push(s.charAt(i));
		if (letters.length !== k || new Set(letters).size !== k) continue;
		const beauty = letters.reduce((sum, c) => sum + (freq.get(c) ?? 0), 0);
		if (beauty > best) {
			best = beauty;
			count = 1;
		} else if (beauty === best) count++;
	}
	return count;
};

describe("2842. Count K-Subsequences of a String With Maximum Beauty", () => {
	it("solves the examples from the problem statement", () => {
		expect(countKSubsequencesWithMaxBeauty("bcca", 2)).toBe(4);
		expect(countKSubsequencesWithMaxBeauty("abbcd", 4)).toBe(2);
	});

	it("matches checking every subsequence on random strings", () => {
		const random = createRandom(2842);
		for (let run = 0; run < 200; run++) {
			const s = random.string(random.int(1, 11), "abcde");
			const k = random.int(1, 5);
			expect(countKSubsequencesWithMaxBeauty(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
