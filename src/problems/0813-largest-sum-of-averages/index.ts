/**
 * 813. Largest Sum of Averages
 *
 * Splits `nums` into at most `k` non-empty adjacent groups and returns the
 * largest possible sum of the groups' averages.
 *
 * `best[g][i]` is the best score for the first `i` numbers in `g` groups:
 * the last group is some `nums[j..i)`, and the rest is `best[g - 1][j]`.
 * Prefix sums give each group's average in O(1). More groups never hurt, so
 * using exactly `k` gives the answer.
 *
 * @see https://leetcode.com/problems/largest-sum-of-averages/
 * @difficulty Medium
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * largestSumOfAverages([9, 1, 2, 3, 9], 3); // 20: [9], [1, 2, 3], [9]
 */
export const largestSumOfAverages = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const average = (from: number, to: number): number =>
		((prefix[to] ?? 0) - (prefix[from] ?? 0)) / (to - from);

	let best = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 ? 0 : average(0, i),
	);
	for (let groups = 2; groups <= k; groups++) {
		const next = [...best];
		for (let i = groups; i <= n; i++) {
			for (let j = groups - 1; j < i; j++)
				next[i] = Math.max(next[i] ?? 0, (best[j] ?? 0) + average(j, i));
		}
		best = next;
	}
	return best[n] ?? 0;
};
