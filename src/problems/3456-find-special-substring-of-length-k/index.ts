/**
 * 3456. Find Special Substring of Length K
 *
 * Whether `s` has a run of exactly `k` copies of one letter, with different
 * letters (or the string's ends) on either side.
 *
 * Measure the maximal runs.
 *
 * @see https://leetcode.com/problems/find-special-substring-of-length-k/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findSpecialSubstringOfLengthK("aaabaaa", 3); // true
 */
export const findSpecialSubstringOfLengthK = (
	s: string,
	k: number,
): boolean => {
	for (let i = 0; i < s.length; ) {
		let j = i;
		while (j < s.length && s[j] === s[i]) j++;
		if (j - i === k) return true;
		i = j;
	}
	return false;
};
