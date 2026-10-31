/**
 * 3722. Lexicographically Smallest String After Reverse
 *
 * Reverse exactly one prefix or one suffix of `s`, of any length from 1.
 * Returns the smallest result.
 *
 * Try them all.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-reverse/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterReverse("dcab"); // "acdb"
 */
export const lexicographicallySmallestStringAfterReverse = (
	s: string,
): string => {
	const reverse = (t: string) => [...t].reverse().join("");
	let best = s;
	for (let k = 1; k <= s.length; k++)
		for (const candidate of [
			reverse(s.slice(0, k)) + s.slice(k),
			s.slice(0, s.length - k) + reverse(s.slice(s.length - k)),
		])
			if (candidate < best) best = candidate;
	return best;
};
