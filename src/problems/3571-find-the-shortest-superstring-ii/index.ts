/**
 * 3571. Find the Shortest Superstring II
 *
 * A shortest string containing both `s1` and `s2` as substrings.
 *
 * If one contains the other, that's it. Otherwise overlap the end of one
 * with the start of the other as much as possible, trying both orders.
 *
 * @see https://leetcode.com/problems/find-the-shortest-superstring-ii/
 * @difficulty Easy
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findTheShortestSuperstringII("aba", "bab"); // "abab"
 */
export const findTheShortestSuperstringII = (
	s1: string,
	s2: string,
): string => {
	if (s1.includes(s2)) return s1;
	if (s2.includes(s1)) return s2;
	const join = (a: string, b: string): string => {
		for (let overlap = Math.min(a.length, b.length); overlap > 0; overlap--)
			if (a.endsWith(b.slice(0, overlap))) return a + b.slice(overlap);
		return a + b;
	};
	const first = join(s1, s2);
	const second = join(s2, s1);
	return first.length <= second.length ? first : second;
};
