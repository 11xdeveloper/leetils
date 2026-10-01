/**
 * 1673. Find the Most Competitive Subsequence
 *
 * Returns the lexicographically smallest subsequence of `nums` of length
 * `k`.
 *
 * A monotonic stack: pop larger elements while enough elements remain to
 * still fill `k` places, then push if there is room.
 *
 * @see https://leetcode.com/problems/find-the-most-competitive-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * findTheMostCompetitiveSubsequence([2, 4, 3, 3, 5, 4, 9, 6], 4); // [2, 3, 3, 4]
 */
export const findTheMostCompetitiveSubsequence = (
	nums: readonly number[],
	k: number,
): number[] => {
	const stack: number[] = [];
	for (const [i, num] of nums.entries()) {
		while (
			stack.length > 0 &&
			(stack.at(-1) ?? 0) > num &&
			stack.length - 1 + nums.length - i >= k
		)
			stack.pop();
		if (stack.length < k) stack.push(num);
	}
	return stack;
};
