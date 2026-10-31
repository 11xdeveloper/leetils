import { Heap } from "../../internal/heap";

/**
 * 2530. Maximal Score After Applying K Operations
 *
 * Each of `k` operations picks an element, adds it to the score and
 * replaces it with a third of itself rounded up. Returns the largest
 * score possible.
 *
 * Always take the current largest element, using a max-heap.
 *
 * @see https://leetcode.com/problems/maximal-score-after-applying-k-operations/
 * @difficulty Medium
 * @timeComplexity O(n + k log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximalScoreAfterApplyingKOperations([1, 10, 3, 3, 3], 3); // 17
 */
export const maximalScoreAfterApplyingKOperations = (
	nums: readonly number[],
	k: number,
): number => {
	const heap = new Heap<number>((a, b) => b - a, nums);
	let score = 0;
	for (let i = 0; i < k; i++) {
		const largest = heap.pop() ?? 0;
		score += largest;
		heap.push(Math.ceil(largest / 3));
	}
	return score;
};
