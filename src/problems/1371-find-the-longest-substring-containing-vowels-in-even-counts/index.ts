/**
 * 1371. Find the Longest Substring Containing Vowels in Even Counts
 *
 * Returns the length of the longest substring of `s` in which each vowel
 * appears an even number of times.
 *
 * Tracks the parity of each vowel so far as a 5-bit mask. A substring has
 * even counts exactly when the masks before and after it match, so each
 * position pairs with the first position that had the same mask.
 *
 * @see https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 32 masks
 *
 * @example
 * findTheLongestSubstringContainingVowelsInEvenCounts("eleetminicoworoep"); // 13
 */
export const findTheLongestSubstringContainingVowelsInEvenCounts = (
	s: string,
): number => {
	const first = new Array<number>(32).fill(Infinity);
	first[0] = -1;
	let [mask, longest] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		const vowel = "aeiou".indexOf(s[i] ?? "");
		if (vowel !== -1) mask ^= 1 << vowel;
		const start = first[mask] ?? Infinity;
		if (start === Infinity) first[mask] = i;
		else longest = Math.max(longest, i - start);
	}
	return longest;
};
