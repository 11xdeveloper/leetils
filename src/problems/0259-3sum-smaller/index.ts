/**
 * 259. 3Sum Smaller
 *
 * Returns how many triplets of indices `i < j < k` have
 * `nums[i] + nums[j] + nums[k] < target`.
 *
 * Only which values are chosen matters, not their order, so it sorts a
 * copy. Then for each first value, two pointers move in from both ends of
 * the rest: when the three sum below the target, every choice of third
 * value between the pointers does too, so they're all counted at once.
 *
 * @see https://leetcode.com/problems/3sum-smaller/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * threeSumSmaller([-2, 0, 1, 3], 2); // 2: [-2, 0, 1] and [-2, 0, 3]
 */
export const threeSumSmaller = (
	nums: readonly number[],
	target: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let count = 0;

	for (let i = 0; i < sorted.length - 2; i++) {
		let left = i + 1;
		let right = sorted.length - 1;
		while (left < right) {
			if (
				(sorted[i] ?? 0) + (sorted[left] ?? 0) + (sorted[right] ?? 0) <
				target
			) {
				count += right - left;
				left++;
			} else {
				right--;
			}
		}
	}

	return count;
};
