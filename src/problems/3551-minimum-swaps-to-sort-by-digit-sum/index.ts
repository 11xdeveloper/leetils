/**
 * 3551. Minimum Swaps to Sort by Digit Sum
 *
 * The fewest swaps to sort the distinct numbers of `nums` by digit sum,
 * then by value.
 *
 * Work out where each element belongs; the swaps needed are n minus the
 * number of cycles in that permutation.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSwapsToSortByDigitSum([37, 100]); // 1
 */
export const minimumSwapsToSortByDigitSum = (
	nums: readonly number[],
): number => {
	const digitSum = (num: number): number =>
		[...String(num)].reduce((s, d) => s + Number(d), 0);
	const order = nums
		.map((_, i) => i)
		.sort(
			(a, b) =>
				digitSum(nums[a] ?? 0) - digitSum(nums[b] ?? 0) ||
				(nums[a] ?? 0) - (nums[b] ?? 0),
		);
	const seen = new Uint8Array(nums.length);
	let swaps = 0;
	for (let start = 0; start < nums.length; start++) {
		if (seen[start]) continue;
		let length = 0;
		for (let at = start; !seen[at]; at = order[at] ?? 0) {
			seen[at] = 1;
			length++;
		}
		swaps += length - 1;
	}
	return swaps;
};
