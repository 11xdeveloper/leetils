/**
 * 3752. Lexicographically Smallest Negated Permutation that Sums to Target
 *
 * Arrange 1 to `n`, negating any of them, so the array sums to `target`.
 * Returns the lexicographically smallest such array, or `[]`.
 *
 * The negated numbers must add up to (n(n + 1)/2 - target) / 2. Sorted,
 * the array lists the negated numbers from largest down, then the rest
 * increasing, so negate numbers from n down greedily whenever they fit;
 * the smaller ones can always make up any remainder.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestNegatedPermutationThatSumsToTarget(3, 0); // [-3, 1, 2]
 */
export const lexicographicallySmallestNegatedPermutationThatSumsToTarget = (
	n: number,
	target: number,
): number[] => {
	const total = (n * (n + 1)) / 2;
	const excess = total - target;
	if (excess < 0 || excess > 2 * total || excess % 2 !== 0) return [];
	let remaining = excess / 2;
	const result: number[] = [];
	for (let i = n; i >= 1; i--)
		if (i <= remaining) {
			result.push(-i);
			remaining -= i;
		} else result.push(i);
	return result.sort((a, b) => a - b);
};
