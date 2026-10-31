/**
 * 2909. Minimum Sum of Mountain Triplets II
 *
 * A mountain triplet `i < j < k` has `nums[i] < nums[j] > nums[k]`.
 * Returns the smallest sum of one, or -1, for arrays too long to check
 * every triplet.
 *
 * For each peak, pair it with the smallest value on each side, from
 * prefix and suffix minimums.
 *
 * @see https://leetcode.com/problems/minimum-sum-of-mountain-triplets-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSumOfMountainTripletsII([5, 4, 8, 7, 10, 2]); // 13
 */
export const minimumSumOfMountainTripletsII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const rightMin = Array.from(
		{ length: n + 1 },
		() => Number.POSITIVE_INFINITY,
	);
	for (let i = n - 1; i >= 0; i--)
		rightMin[i] = Math.min(rightMin[i + 1] ?? 0, nums[i] ?? 0);
	let leftMin = Number.POSITIVE_INFINITY;
	let best = Number.POSITIVE_INFINITY;
	for (let j = 0; j < n; j++) {
		const peak = nums[j] ?? 0;
		const right = rightMin[j + 1] ?? 0;
		if (leftMin < peak && right < peak)
			best = Math.min(best, leftMin + peak + right);
		leftMin = Math.min(leftMin, peak);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
