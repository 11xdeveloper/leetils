import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { palindromePartitioningIV as checkPartitioning } from ".";

/** Tries every pair of cuts, reversing each part. */
const byBruteForce = (s: string): boolean => {
	const palindrome = (t: string) => t === [...t].reverse().join("");
	for (let i = 1; i < s.length - 1; i++) {
		for (let j = i + 1; j < s.length; j++) {
			if (
				palindrome(s.slice(0, i)) &&
				palindrome(s.slice(i, j)) &&
				palindrome(s.slice(j))
			)
				return true;
		}
	}
	return false;
};

describe("1745. Palindrome Partitioning IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkPartitioning("abcbdd")).toBeTrue();
		expect(checkPartitioning("bcbddxy")).toBeFalse();
	});

	it("matches trying every cut on random strings", () => {
		const random = createRandom(1745);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(3, 12), "ab");
			expect(checkPartitioning(s)).toBe(byBruteForce(s));
		}
	});
});
