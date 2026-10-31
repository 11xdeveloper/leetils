/**
 * 3795. Minimum Subarray Length With Distinct Sum At Least K
 *
 * The shortest subarray whose distinct values add up to at least `k`, or
 * -1.
 *
 * Values are positive, so a sliding window works: grow on the right and
 * shrink from the left while the distinct sum still reaches k.
 *
 * @see https://leetcode.com/problems/minimum-subarray-length-with-distinct-sum-at-least-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSubarrayLengthWithDistinctSumAtLeastK([2, 2, 3, 1], 4); // 2
 */
export const minimumSubarrayLengthWithDistinctSumAtLeastK = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	let sum = 0;
	let start = 0;
	let best = -1;
	nums.forEach((num, end) => {
		const count = (counts.get(num) ?? 0) + 1;
		counts.set(num, count);
		if (count === 1) sum += num;
		while (sum >= k) {
			if (best < 0 || end - start + 1 < best) best = end - start + 1;
			const left = nums[start++] ?? 0;
			const remaining = (counts.get(left) ?? 0) - 1;
			counts.set(left, remaining);
			if (remaining === 0) sum -= left;
		}
	});
	return best;
};
