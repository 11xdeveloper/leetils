/**
 * 2926. Maximum Balanced Subsequence Sum
 *
 * A subsequence is balanced if each step between chosen indices raises
 * the value by at least the distance moved. Returns the largest sum of a
 * balanced subsequence.
 *
 * That means `nums[i] - i` never decreases along the subsequence. DP with
 * a Fenwick tree over compressed keys: each element extends the best
 * subsequence ending at a key no larger than its own, if that helps.
 *
 * @see https://leetcode.com/problems/maximum-balanced-subsequence-sum/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBalancedSubsequenceSum([5, -1, -3, 8]); // 13
 */
export const maximumBalancedSubsequenceSum = (
	nums: readonly number[],
): number => {
	const keys = nums.map((num, i) => num - i);
	const sorted = [...new Set(keys)].sort((a, b) => a - b);
	const rank = new Map(sorted.map((key, i) => [key, i + 1]));
	const tree = Array.from(
		{ length: sorted.length + 1 },
		() => Number.NEGATIVE_INFINITY,
	);
	let best = Number.NEGATIVE_INFINITY;
	for (const [i, num] of nums.entries()) {
		const position = rank.get(keys[i] ?? 0) ?? 1;
		let before = Number.NEGATIVE_INFINITY;
		for (let j = position; j > 0; j -= j & -j)
			before = Math.max(before, tree[j] ?? before);
		const sum = num + Math.max(0, before);
		best = Math.max(best, sum);
		for (let j = position; j < tree.length; j += j & -j)
			tree[j] = Math.max(tree[j] ?? sum, sum);
	}
	return best;
};
