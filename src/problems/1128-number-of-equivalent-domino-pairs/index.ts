/**
 * 1128. Number of Equivalent Domino Pairs
 *
 * Two dominoes are equivalent if one can be rotated to equal the other.
 * Returns the number of pairs of equivalent dominoes.
 *
 * Counts each domino under a key with its smaller number first; a domino
 * pairs with every equivalent one seen before it.
 *
 * @see https://leetcode.com/problems/number-of-equivalent-domino-pairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 100 keys
 *
 * @example
 * numberOfEquivalentDominoPairs([[1, 2], [2, 1], [3, 4], [5, 6]]); // 1
 */
export const numberOfEquivalentDominoPairs = (
	dominoes: readonly (readonly number[])[],
): number => {
	const counts = new Array<number>(100).fill(0);
	let pairs = 0;
	for (const [a = 0, b = 0] of dominoes) {
		const key = Math.min(a, b) * 10 + Math.max(a, b);
		pairs += counts[key] ?? 0;
		counts[key] = (counts[key] ?? 0) + 1;
	}
	return pairs;
};
