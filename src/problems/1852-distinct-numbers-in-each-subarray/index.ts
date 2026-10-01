/**
 * 1852. Distinct Numbers in Each Subarray
 *
 * Returns the number of distinct values in every window of `k`
 * consecutive elements of `nums`.
 *
 * A sliding window with a count per value.
 *
 * @see https://leetcode.com/problems/distinct-numbers-in-each-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * distinctNumbersInEachSubarray([1, 2, 3, 2, 2, 1, 3], 3); // [3, 2, 2, 2, 3]
 */
export const distinctNumbersInEachSubarray = (
	nums: readonly number[],
	k: number,
): number[] => {
	const counts = new Map<number, number>();
	const answer: number[] = [];
	for (const [i, num] of nums.entries()) {
		counts.set(num, (counts.get(num) ?? 0) + 1);
		if (i >= k) {
			const old = nums[i - k] ?? 0;
			const left = (counts.get(old) ?? 0) - 1;
			if (left === 0) counts.delete(old);
			else counts.set(old, left);
		}
		if (i >= k - 1) answer.push(counts.size);
	}
	return answer;
};
