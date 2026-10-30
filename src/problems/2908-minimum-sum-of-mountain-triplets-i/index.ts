/**
 * 2908. Minimum Sum of Mountain Triplets I
 *
 * A mountain triplet `i < j < k` has `nums[i] < nums[j] > nums[k]`.
 * Returns the smallest sum of one, or -1.
 *
 * For each peak, pair it with the smallest value on each side.
 *
 * @see https://leetcode.com/problems/minimum-sum-of-mountain-triplets-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSumOfMountainTripletsI([8, 6, 1, 5, 3]); // 9
 */
export const minimumSumOfMountainTripletsI = (
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
