import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { canMakePalindromeFromSubstring as canMakePaliQueries } from ".";

/** Tries every rearrangement and every set of up to k replacements. */
const byBruteForce = (s: string, alphabet: string, k: number): boolean => {
	const permutations = (chars: string[]): string[] =>
		chars.length <= 1
			? [chars.join("")]
			: [
					...new Set(
						chars.flatMap((char, i) =>
							permutations(chars.filter((_, j) => j !== i)).map(
								(rest) => char + rest,
							),
						),
					),
				];
	const isPalindrome = (t: string) => t === [...t].reverse().join("");
	const replace = (t: string, from: number, left: number): boolean => {
		if (isPalindrome(t)) return true;
		if (left === 0) return false;
		for (let i = from; i < t.length; i++) {
			for (const char of alphabet) {
				if (replace(t.slice(0, i) + char + t.slice(i + 1), i + 1, left - 1))
					return true;
			}
		}
		return false;
	};
	return permutations([...s]).some((t) => replace(t, 0, k));
};

describe("1177. Can Make Palindrome from Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			canMakePaliQueries("abcda", [
				[3, 3, 0],
				[1, 2, 0],
				[0, 3, 1],
				[0, 3, 2],
				[0, 4, 1],
			]),
		).toEqual([true, false, false, true, true]);
		expect(
			canMakePaliQueries("lyb", [
				[0, 1, 0],
				[2, 2, 1],
			]),
		).toEqual([false, true]);
	});

	it("matches trying every rearrangement and replacement on random inputs", () => {
		const random = createRandom(1177);
		for (let run = 0; run < 100; run++) {
			const s = random.string(random.int(1, 6), "abc");
			const [a, b] = [random.int(0, s.length - 1), random.int(0, s.length - 1)];
			const [left, right] = [Math.min(a, b), Math.max(a, b)];
			const k = random.int(0, 2);
			expect(canMakePaliQueries(s, [[left, right, k]])).toEqual([
				byBruteForce(s.slice(left, right + 1), "abc", k),
			]);
		}
	});
});
