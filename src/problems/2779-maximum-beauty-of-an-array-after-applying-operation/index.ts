/**
 * 2779. Maximum Beauty of an Array After Applying Operation
 *
 * Each element may be replaced once by any value within `k` of it. The
 * beauty is the longest subsequence of equal elements. Returns the
 * largest beauty possible.
 *
 * Elements can meet when they're within `2k` of each other, so sort and
 * find the widest window spanning at most `2k`.
 *
 * @see https://leetcode.com/problems/maximum-beauty-of-an-array-after-applying-operation/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumBeautyOfAnArrayAfterApplyingOperation([4, 6, 1, 2], 2); // 3
 */
export const maximumBeautyOfAnArrayAfterApplyingOperation = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = 0;
	let left = 0;
	for (const [right, value] of sorted.entries()) {
		while (value - (sorted[left] ?? 0) > 2 * k) left++;
		best = Math.max(best, right - left + 1);
	}
	return best;
};
