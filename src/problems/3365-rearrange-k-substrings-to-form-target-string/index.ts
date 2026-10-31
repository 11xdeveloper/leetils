/**
 * 3365. Rearrange K Substrings to Form Target String
 *
 * Whether `s` can be split into `k` equal pieces and rearranged into `t`
 * (an anagram of it).
 *
 * That works exactly when `s` and `t` split into the same multiset of
 * pieces.
 *
 * @see https://leetcode.com/problems/rearrange-k-substrings-to-form-target-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangeKSubstringsToFormTargetString("abcd", "cdab", 2); // true
 */
export const rearrangeKSubstringsToFormTargetString = (
	s: string,
	t: string,
	k: number,
): boolean => {
	const size = s.length / k;
	const pieces = new Map<string, number>();
	for (let i = 0; i < s.length; i += size) {
		const piece = s.slice(i, i + size);
		pieces.set(piece, (pieces.get(piece) ?? 0) + 1);
	}
	for (let i = 0; i < t.length; i += size) {
		const piece = t.slice(i, i + size);
		const left = (pieces.get(piece) ?? 0) - 1;
		if (left < 0) return false;
		pieces.set(piece, left);
	}
	return true;
};
