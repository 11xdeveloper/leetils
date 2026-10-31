/**
 * 3146. Permutation Difference between Two Strings
 *
 * For two permutations of the same distinct letters, the sum over letters
 * of the distance between their positions in `s` and `t`.
 *
 * Record each letter's position in `s`, then add up the differences.
 *
 * @see https://leetcode.com/problems/permutation-difference-between-two-strings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * permutationDifferenceBetweenTwoStrings("abc", "bac"); // 2
 */
export const permutationDifferenceBetweenTwoStrings = (
	s: string,
	t: string,
): number => {
	const position = new Map<string, number>();
	for (let i = 0; i < s.length; i++) position.set(s.charAt(i), i);
	let total = 0;
	for (let i = 0; i < t.length; i++)
		total += Math.abs((position.get(t.charAt(i)) ?? 0) - i);
	return total;
};
