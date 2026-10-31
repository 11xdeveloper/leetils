/**
 * 3282. Reach End of Array With Max Score
 *
 * Jump forwards from index 0 to the last index; a jump from i to j scores
 * `(j - i) · nums[i]`. Returns the largest total score.
 *
 * Each unit step scores the value where its jump started, at best the
 * largest value so far. Jumping from each new prefix maximum to the next
 * achieves that, so add up the running maxima.
 *
 * @see https://leetcode.com/problems/reach-end-of-array-with-max-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reachEndOfArrayWithMaxScore([1, 3, 1, 5]); // 7
 */
export const reachEndOfArrayWithMaxScore = (
	nums: readonly number[],
): number => {
	let score = 0;
	let max = 0;
	for (let i = 0; i + 1 < nums.length; i++) {
		max = Math.max(max, nums[i] ?? 0);
		score += max;
	}
	return score;
};
