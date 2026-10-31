/**
 * 2002. Maximum Product of the Length of Two Palindromic Subsequences
 *
 * Returns the largest product of the lengths of two disjoint palindromic
 * subsequences of `s` (at most 12 characters).
 *
 * List every palindromic subsequence as a bitmask of positions, then try
 * every pair of disjoint masks.
 *
 * @see https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-subsequences/
 * @difficulty Medium
 * @timeComplexity O(4^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * maximumProductOfTheLengthOfTwoPalindromicSubsequences("leetcodecom"); // 9
 */
export const maximumProductOfTheLengthOfTwoPalindromicSubsequences = (
	s: string,
): number => {
	const palindromes: [mask: number, length: number][] = [];
	for (let mask = 1; mask < 1 << s.length; mask++) {
		let chars = "";
		for (let i = 0; i < s.length; i++) if (mask & (1 << i)) chars += s[i];
		if (chars === [...chars].reverse().join(""))
			palindromes.push([mask, chars.length]);
	}
	let best = 0;
	for (const [i, [a, lengthA]] of palindromes.entries()) {
		for (const [b, lengthB] of palindromes.slice(i + 1)) {
			if (!(a & b)) best = Math.max(best, lengthA * lengthB);
		}
	}
	return best;
};
