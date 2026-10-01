/**
 * 747. Largest Number At Least Twice of Others
 *
 * `nums` has a unique largest element. Returns its index if it's at least
 * twice every other element, or -1 otherwise.
 *
 * Only the second largest matters, so one pass finds the largest and
 * second largest.
 *
 * @see https://leetcode.com/problems/largest-number-at-least-twice-of-others/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * largestNumberAtLeastTwiceOfOthers([3, 6, 1, 0]); // 1
 */
export const largestNumberAtLeastTwiceOfOthers = (
	nums: readonly number[],
): number => {
	let largest = -1;
	let second = Number.NEGATIVE_INFINITY;
	for (const [i, num] of nums.entries()) {
		const current = nums[largest] ?? Number.NEGATIVE_INFINITY;
		if (num > current) {
			second = current;
			largest = i;
		} else {
			second = Math.max(second, num);
		}
	}
	return (nums[largest] ?? 0) >= 2 * second ? largest : -1;
};
