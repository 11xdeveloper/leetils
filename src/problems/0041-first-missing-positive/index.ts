/**
 * 41. First Missing Positive
 *
 * Returns the smallest positive integer that isn't in `nums`. The problem
 * requires O(n) time and O(1) extra space, which is only possible by
 * rearranging `nums` in place, so the input array is modified.
 *
 * The answer is at most `n + 1`, so only values from 1 to `n` matter. Swaps
 * each such value `v` into index `v - 1`, then returns one more than the
 * first index that doesn't hold its own value.
 *
 * @see https://leetcode.com/problems/first-missing-positive/
 * @difficulty Hard
 * @timeComplexity O(n), since each swap puts a value in its final place
 * @spaceComplexity O(1)
 *
 * @example
 * firstMissingPositive([3, 4, -1, 1]); // 2
 * firstMissingPositive([7, 8, 9, 11, 12]); // 1
 */
export const firstMissingPositive = (nums: number[]): number => {
	const n = nums.length;

	for (let i = 0; i < n; i++) {
		let value = nums[i] ?? 0;
		while (value >= 1 && value <= n && nums[value - 1] !== value) {
			const displaced = nums[value - 1] ?? 0;
			nums[value - 1] = value;
			nums[i] = displaced;
			value = displaced;
		}
	}

	for (let i = 0; i < n; i++) {
		if (nums[i] !== i + 1) return i + 1;
	}

	return n + 1;
};
