/**
 * 2974. Minimum Number Game
 *
 * Each round Alice removes the smallest number, then Bob the next
 * smallest; Bob appends his to the result first, then Alice hers. Returns
 * the result.
 *
 * Sort and swap each adjacent pair.
 *
 * @see https://leetcode.com/problems/minimum-number-game/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberGame([5, 4, 2, 3]); // [3, 2, 5, 4]
 */
export const minimumNumberGame = (nums: readonly number[]): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	for (let i = 0; i + 1 < sorted.length; i += 2)
		[sorted[i], sorted[i + 1]] = [sorted[i + 1] ?? 0, sorted[i] ?? 0];
	return sorted;
};
