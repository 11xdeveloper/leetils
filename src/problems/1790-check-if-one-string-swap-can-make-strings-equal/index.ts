/**
 * 1790. Check if One String Swap Can Make Strings Equal
 *
 * Returns whether swapping at most one pair of characters in one string
 * makes `s1` and `s2` equal.
 *
 * They must differ in exactly zero or two places, with the two mismatched
 * pairs crossed.
 *
 * @see https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfOneStringSwapCanMakeStringsEqual("bank", "kanb"); // true
 */
export const checkIfOneStringSwapCanMakeStringsEqual = (
	s1: string,
	s2: string,
): boolean => {
	const differ: number[] = [];
	for (let i = 0; i < s1.length; i++) {
		if (s1[i] === s2[i]) continue;
		differ.push(i);
		if (differ.length > 2) return false;
	}
	if (differ.length === 0) return true;
	const [i = 0, j = 0] = differ;
	return differ.length === 2 && s1[i] === s2[j] && s1[j] === s2[i];
};
