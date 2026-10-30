/**
 * 2593. Find Score of an Array After Marking All Elements
 *
 * Repeatedly take the smallest unmarked element, earliest on ties, add it
 * to the score, and mark it and its two neighbours. Returns the score
 * once everything is marked.
 *
 * Visit indices in order of value then index, skipping marked ones.
 *
 * @see https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findScoreOfAnArrayAfterMarkingAllElements([2, 1, 3, 4, 5, 2]); // 7
 */
export const findScoreOfAnArrayAfterMarkingAllElements = (
	nums: readonly number[],
): number => {
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0) || a - b);
	const marked = new Uint8Array(nums.length + 1);
	let score = 0;
	for (const i of order) {
		if (marked[i]) continue;
		score += nums[i] ?? 0;
		marked[i] = 1;
		marked[i + 1] = 1;
		if (i > 0) marked[i - 1] = 1;
	}
	return score;
};
