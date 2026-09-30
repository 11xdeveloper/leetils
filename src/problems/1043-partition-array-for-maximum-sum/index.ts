/**
 * 1043. Partition Array for Maximum Sum
 *
 * Cuts `arr` into consecutive pieces of length at most `k`, replaces every
 * value in a piece by the piece's maximum, and returns the largest possible
 * sum afterwards.
 *
 * `best[i]` is the answer for the first `i` values: the last piece covers
 * the final 1 to `k` of them, worth its maximum times its length.
 *
 * @see https://leetcode.com/problems/partition-array-for-maximum-sum/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayForMaximumSum([1, 15, 7, 9, 2, 5, 10], 3); // 84
 */
export const partitionArrayForMaximumSum = (
	arr: readonly number[],
	k: number,
): number => {
	const best = [0];
	for (let i = 1; i <= arr.length; i++) {
		let max = 0;
		let value = 0;
		for (let length = 1; length <= k && length <= i; length++) {
			max = Math.max(max, arr[i - length] ?? 0);
			value = Math.max(value, (best[i - length] ?? 0) + max * length);
		}
		best.push(value);
	}
	return best[arr.length] ?? 0;
};
