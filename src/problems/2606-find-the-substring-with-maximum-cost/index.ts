/**
 * 2606. Find the Substring With Maximum Cost
 *
 * Each letter in `chars` is worth the matching value in `vals`; any other
 * letter is worth its position in the alphabet, from 1. Returns the
 * largest total of any substring, where the empty one is worth 0.
 *
 * Kadane's algorithm over the letter values.
 *
 * @see https://leetcode.com/problems/find-the-substring-with-maximum-cost/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheSubstringWithMaximumCost("adaa", "d", [-1000]); // 2
 */
export const findTheSubstringWithMaximumCost = (
	s: string,
	chars: string,
	vals: readonly number[],
): number => {
	const worth = Array.from({ length: 26 }, (_, i) => i + 1);
	for (let i = 0; i < chars.length; i++)
		worth[chars.charCodeAt(i) - 97] = vals[i] ?? 0;
	let best = 0;
	let current = 0;
	for (let i = 0; i < s.length; i++) {
		current = Math.max(0, current + (worth[s.charCodeAt(i) - 97] ?? 0));
		best = Math.max(best, current);
	}
	return best;
};
