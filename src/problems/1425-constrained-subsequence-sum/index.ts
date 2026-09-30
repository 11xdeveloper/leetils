/**
 * 1425. Constrained Subsequence Sum
 *
 * Returns the largest sum of a non-empty subsequence of `nums` whose
 * consecutive chosen indices are at most `k` apart.
 *
 * `best[i]` is the largest sum of such a subsequence ending at `i`: `nums[i]`
 * plus the best of the previous `k` values, if positive. A deque of indices
 * with decreasing `best` values gives that window maximum in constant time.
 *
 * @see https://leetcode.com/problems/constrained-subsequence-sum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * constrainedSubsequenceSum([10, 2, -10, 5, 20], 2); // 37
 */
export const constrainedSubsequenceSum = (
	nums: readonly number[],
	k: number,
): number => {
	const best = new Array<number>(nums.length).fill(0);
	const window: number[] = [];
	let front = 0;
	let answer = -Infinity;
	nums.forEach((num, i) => {
		if (front < window.length && (window[front] ?? 0) < i - k) front++;
		const previous =
			front < window.length ? (best[window[front] ?? 0] ?? 0) : 0;
		best[i] = num + Math.max(0, previous);
		answer = Math.max(answer, best[i] ?? 0);
		while (
			window.length > front &&
			(best[window.at(-1) ?? 0] ?? 0) <= (best[i] ?? 0)
		)
			window.pop();
		window.push(i);
	});
	return answer;
};
