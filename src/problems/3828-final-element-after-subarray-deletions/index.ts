/**
 * 3828. Final Element After Subarray Deletions
 *
 * Alice and Bob take turns, Alice first, deleting any subarray shorter
 * than the whole array until one element is left; Alice wants it large,
 * Bob small. Returns the final element under optimal play.
 *
 * Alice can delete everything but either end, so she gets the larger
 * end. She can't do better: any longer array she leaves keeps one of the
 * original ends at an end, and Bob would keep the smaller end.
 *
 * @see https://leetcode.com/problems/final-element-after-subarray-deletions/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * finalElementAfterSubarrayDeletions([1, 5, 2]); // 2
 */
export const finalElementAfterSubarrayDeletions = (
	nums: readonly number[],
): number => Math.max(nums[0] ?? 0, nums.at(-1) ?? 0);
