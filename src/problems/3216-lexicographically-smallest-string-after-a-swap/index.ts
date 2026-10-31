/**
 * 3216. Lexicographically Smallest String After a Swap
 *
 * The smallest string reachable by swapping at most one pair of neighbouring
 * digits of the same parity in `s`.
 *
 * Swap the first such pair that's out of order.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-string-after-a-swap/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestStringAfterASwap("45320"); // "43520"
 */
export const lexicographicallySmallestStringAfterASwap = (
	s: string,
): string => {
	for (let i = 0; i + 1 < s.length; i++) {
		const [a, b] = [s.charCodeAt(i), s.charCodeAt(i + 1)];
		if (a > b && a % 2 === b % 2)
			return s.slice(0, i) + s.charAt(i + 1) + s.charAt(i) + s.slice(i + 2);
	}
	return s;
};
