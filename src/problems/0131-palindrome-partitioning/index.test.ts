import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromePartitioning } from ".";

const isPalindrome = (s: string): boolean => s === [...s].reverse().join("");

/** Tries every set of cut positions. */
const byBruteForce = (s: string): string[][] => {
	const results: string[][] = [];
	for (let mask = 0; mask < 1 << (s.length - 1); mask++) {
		const parts: string[] = [];
		let start = 0;
		for (let i = 1; i <= s.length; i++) {
			if (i === s.length || mask & (1 << (i - 1))) {
				parts.push(s.slice(start, i));
				start = i;
			}
		}
		if (parts.every(isPalindrome)) results.push(parts);
	}
	return results;
};

const normalize = (partitions: string[][]): string[] =>
	partitions.map((parts) => parts.join("|")).toSorted();

describe("131. Palindrome Partitioning", () => {
	it("solves the examples from the problem statement", () => {
		expect(palindromePartitioning("aab")).toEqual([
			["a", "a", "b"],
			["aa", "b"],
		]);
		expect(palindromePartitioning("a")).toEqual([["a"]]);
	});

	it("matches trying every set of cuts on random inputs", () => {
		const random = createRandom(131);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "ab");
			expect(normalize(palindromePartitioning(s))).toEqual(
				normalize(byBruteForce(s)),
			);
		}
	});
});
