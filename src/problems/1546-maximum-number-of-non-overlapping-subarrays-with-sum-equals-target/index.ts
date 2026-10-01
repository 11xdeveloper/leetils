/**
 * 1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target
 *
 * Returns the most non-overlapping subarrays of `nums` that each sum to
 * `target`.
 *
 * Greedy: take each qualifying subarray as soon as it ends, then start
 * afresh after it. Prefix sums since the last cut, kept in a set, detect a
 * subarray ending here with the right sum.
 *
 * @see https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfNonOverlappingSubarraysWithSumEqualsTarget([-1, 3, 5, 1, 4, 2, -9], 6); // 2
 */
export const maximumNumberOfNonOverlappingSubarraysWithSumEqualsTarget = (
	nums: readonly number[],
	target: number,
): number => {
	let prefixes = new Set([0]);
	let [sum, count] = [0, 0];
	for (const num of nums) {
		sum += num;
		if (prefixes.has(sum - target)) {
			count++;
			[prefixes, sum] = [new Set([0]), 0];
		} else {
			prefixes.add(sum);
		}
	}
	return count;
};
