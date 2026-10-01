/**
 * 1671. Minimum Number of Removals to Make Mountain Array
 *
 * Returns the fewest removals turning `nums` into a mountain: strictly
 * increasing to a peak, then strictly decreasing, with at least one
 * element on each side.
 *
 * For every index, the longest strictly increasing subsequence ending
 * there (from the left) and starting there (from the right) give the
 * largest mountain peaking at it, using patience sorting both ways.
 *
 * @see https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfRemovalsToMakeMountainArray([2, 1, 1, 5, 6, 2, 3, 1]); // 3
 */
export const minimumNumberOfRemovalsToMakeMountainArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const increasingEndingAt = (values: readonly number[]) => {
		const tails: number[] = [];
		return values.map((value) => {
			let [low, high] = [0, tails.length];
			while (low < high) {
				const mid = (low + high) >>> 1;
				if ((tails[mid] ?? 0) < value) low = mid + 1;
				else high = mid;
			}
			tails[low] = value;
			return low + 1;
		});
	};
	const left = increasingEndingAt(nums);
	const right = increasingEndingAt(nums.toReversed()).reverse();
	let longest = 0;
	for (let i = 1; i < n - 1; i++) {
		const [up, down] = [left[i] ?? 0, right[i] ?? 0];
		if (up > 1 && down > 1) longest = Math.max(longest, up + down - 1);
	}
	return n - longest;
};
