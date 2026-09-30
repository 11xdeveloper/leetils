/**
 * 1358. Number of Substrings Containing All Three Characters
 *
 * Returns how many substrings of `s` (made of `a`, `b` and `c`) contain all
 * three letters.
 *
 * For each end position, a substring ending there qualifies exactly when
 * it starts at or before the earliest of the three letters' latest
 * positions, so that many substrings count.
 *
 * @see https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSubstringsContainingAllThreeCharacters("abcabc"); // 10
 */
export const numberOfSubstringsContainingAllThreeCharacters = (
	s: string,
): number => {
	const last = [-1, -1, -1];
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		last[s.charCodeAt(i) - 97] = i;
		count += Math.min(...last) + 1;
	}
	return count;
};
