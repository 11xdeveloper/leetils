/**
 * 16. 3Sum Closest
 *
 * Returns the sum of the three values from `nums`, at different indices,
 * whose sum is closest to `target`. Exactly one closest sum exists.
 *
 * Sorts a copy, fixes each first value in turn, and moves two pointers in
 * from both ends of the rest: left when the sum is too small, right when it
 * is too large.
 *
 * @see https://leetcode.com/problems/3sum-closest/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * threeSumClosest([-1, 2, 1, -4], 1); // 2, from -1 + 2 + 1
 */
export const threeSumClosest = (
	nums: readonly number[],
	target: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let closest = (sorted[0] ?? 0) + (sorted[1] ?? 0) + (sorted[2] ?? 0);

	for (let i = 0; i < sorted.length - 2; i++) {
		let left = i + 1;
		let right = sorted.length - 1;

		while (left < right) {
			const sum = (sorted[i] ?? 0) + (sorted[left] ?? 0) + (sorted[right] ?? 0);
			if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;

			if (sum < target) left++;
			else if (sum > target) right--;
			else return sum;
		}
	}

	return closest;
};
