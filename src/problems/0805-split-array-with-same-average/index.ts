/**
 * 805. Split Array With Same Average
 *
 * Returns whether `nums` can be split into two non-empty groups with the
 * same average.
 *
 * Both groups then have the overall average, so it's asking for a group of
 * some size `k` (at most half the array, by symmetry) whose sum is
 * `total · k / n`, an integer. A DP builds the set of achievable sums for
 * each group size.
 *
 * @see https://leetcode.com/problems/split-array-with-same-average/
 * @difficulty Hard
 * @timeComplexity O(n^2 · total)
 * @spaceComplexity O(n · total)
 *
 * @example
 * splitArrayWithSameAverage([1, 2, 3, 4, 5, 6, 7, 8]); // true: [1, 4, 5, 8] and [2, 3, 6, 7]
 */
export const splitArrayWithSameAverage = (nums: readonly number[]): boolean => {
	const n = nums.length;
	const total = nums.reduce((sum, num) => sum + num, 0);
	const half = Math.floor(n / 2);
	if (
		!Array.from({ length: half }, (_, i) => i + 1).some(
			(k) => (total * k) % n === 0,
		)
	)
		return false;

	// sums[k] holds the sums of groups of k numbers.
	const sums = Array.from({ length: half + 1 }, () => new Set<number>());
	sums[0]?.add(0);
	for (const num of nums) {
		for (let k = half; k >= 1; k--)
			for (const sum of sums[k - 1] ?? []) sums[k]?.add(sum + num);
	}

	for (let k = 1; k <= half; k++) {
		if ((total * k) % n === 0 && sums[k]?.has((total * k) / n)) return true;
	}
	return false;
};
