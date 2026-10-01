/**
 * 1750. Minimum Length of String After Deleting Similar Ends
 *
 * Repeatedly removes a non-empty prefix and a non-overlapping suffix of
 * `s` made of the same single character. Returns the shortest length
 * reachable.
 *
 * Two pointers: while both ends hold the same character, strip every copy
 * of it from both ends (taking more never hurts).
 *
 * @see https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumLengthOfStringAfterDeletingSimilarEnds("aabccabba"); // 3
 */
export const minimumLengthOfStringAfterDeletingSimilarEnds = (
	s: string,
): number => {
	let [left, right] = [0, s.length - 1];
	while (left < right && s[left] === s[right]) {
		const char = s[left];
		while (left <= right && s[left] === char) left++;
		while (right >= left && s[right] === char) right--;
	}
	return right - left + 1;
};
