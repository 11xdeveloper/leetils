/**
 * 239. Sliding Window Maximum
 *
 * Returns the largest value in each window of `k` consecutive elements of
 * `nums`, as the window slides from left to right.
 *
 * Keeps a deque of indices whose values decrease from front to back. A new
 * value evicts every smaller value behind it, since those can never be a
 * window's maximum again, and indices that fall out of the window leave the
 * front. The front is always the current window's maximum.
 *
 * @see https://leetcode.com/problems/sliding-window-maximum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(k)
 *
 * @example
 * slidingWindowMaximum([1, 3, -1, -3, 5, 3, 6, 7], 3); // [3, 3, 5, 5, 6, 7]
 */
export const slidingWindowMaximum = (
	nums: readonly number[],
	k: number,
): number[] => {
	// An array with a moving head works as a deque without shifting elements.
	const deque: number[] = [];
	let head = 0;
	const maximums: number[] = [];

	for (const [i, num] of nums.entries()) {
		while (deque.length > head && (nums[deque.at(-1) ?? 0] ?? 0) <= num)
			deque.pop();
		deque.push(i);
		if ((deque[head] ?? 0) <= i - k) head++;
		if (i >= k - 1) maximums.push(nums[deque[head] ?? 0] ?? 0);
	}

	return maximums;
};
