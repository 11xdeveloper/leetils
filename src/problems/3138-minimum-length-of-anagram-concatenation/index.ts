/**
 * 3138. Minimum Length of Anagram Concatenation
 *
 * The shortest string `t` such that `s` is a concatenation of anagrams of
 * `t`.
 *
 * Try each divisor of the length in increasing order, checking that every
 * block has the same letter counts as the first.
 *
 * @see https://leetcode.com/problems/minimum-length-of-anagram-concatenation/
 * @difficulty Medium
 * @timeComplexity O(n · d(n)), for d(n) divisors
 * @spaceComplexity O(1)
 *
 * @example
 * minimumLengthOfAnagramConcatenation("abba"); // 2
 */
export const minimumLengthOfAnagramConcatenation = (s: string): number => {
	const n = s.length;
	const counts = (from: number, length: number): string => {
		const letters = new Array<number>(26).fill(0);
		for (let i = from; i < from + length; i++)
			letters[s.charCodeAt(i) - 97] = (letters[s.charCodeAt(i) - 97] ?? 0) + 1;
		return letters.join();
	};
	for (let length = 1; length < n; length++) {
		if (n % length !== 0) continue;
		const first = counts(0, length);
		let works = true;
		for (let from = length; from < n && works; from += length)
			works = counts(from, length) === first;
		if (works) return length;
	}
	return n;
};
