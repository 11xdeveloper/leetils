/**
 * 2340. Minimum Adjacent Swaps to Make a Valid Array
 *
 * An array is valid when a smallest element is first and a largest last.
 * Returns the fewest adjacent swaps to make `nums` valid.
 *
 * Move the leftmost minimum to the front and the rightmost maximum to the
 * back; if they cross, one swap does double duty.
 *
 * @see https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAdjacentSwapsToMakeAValidArray([3, 4, 5, 5, 3, 1]); // 6
 */
export const minimumAdjacentSwapsToMakeAValidArray = (
	nums: readonly number[],
): number => {
	let [low, high] = [0, 0];
	for (const [i, num] of nums.entries()) {
		if (num < (nums[low] ?? 0)) low = i;
		if (num >= (nums[high] ?? 0)) high = i;
	}
	return low + (nums.length - 1 - high) - (low > high ? 1 : 0);
};
