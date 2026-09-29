/**
 * 486. Predict the Winner
 *
 * Two players take turns taking a number from either end of `nums`, adding
 * it to their score. Returns whether player 1 can finish with at least as
 * many points as player 2, assuming both play optimally.
 *
 * `lead[i][j]` is the most the player to move can finish ahead by on
 * `nums[i..j]`: they take one end, then the opponent leads by the best on
 * what's left. It's filled for longer ranges from shorter ones, keeping one
 * row.
 *
 * @see https://leetcode.com/problems/predict-the-winner/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * predictTheWinner([1, 5, 233, 7]); // true
 */
export const predictTheWinner = (nums: readonly number[]): boolean => {
	const n = nums.length;
	// lead[j] holds the best lead on nums[i..j] for the current i.
	const lead = [...nums];

	for (let i = n - 2; i >= 0; i--) {
		for (let j = i + 1; j < n; j++) {
			lead[j] = Math.max(
				(nums[i] ?? 0) - (lead[j] ?? 0),
				(nums[j] ?? 0) - (lead[j - 1] ?? 0),
			);
		}
	}

	return (lead[n - 1] ?? 0) >= 0;
};
