/**
 * 1775. Equal Sum Arrays With Minimum Number of Operations
 *
 * Each operation changes one element (all in 1–6) of either array to any
 * value in 1–6. Returns the fewest operations making the sums equal, or
 * -1.
 *
 * Close the gap greedily: raising a value `v` in the smaller-sum array
 * gains up to `6 − v`, and lowering one in the larger-sum array gains up
 * to `v − 1`. Use the biggest gains first, counted in buckets 1–5.
 *
 * @see https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * equalSumArraysWithMinimumNumberOfOperations([1, 2, 3, 4, 5, 6], [1, 1, 2, 2, 2, 2]); // 3
 */
export const equalSumArraysWithMinimumNumberOfOperations = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const sum = (nums: readonly number[]) =>
		nums.reduce((total, num) => total + num, 0);
	let gap = sum(nums1) - sum(nums2);
	const [larger, smaller] = gap >= 0 ? [nums1, nums2] : [nums2, nums1];
	gap = Math.abs(gap);
	const gains = new Array<number>(6).fill(0);
	for (const num of larger) gains[num - 1] = (gains[num - 1] ?? 0) + 1;
	for (const num of smaller) gains[6 - num] = (gains[6 - num] ?? 0) + 1;
	let operations = 0;
	for (let gain = 5; gain >= 1 && gap > 0; gain--) {
		const used = Math.min(gains[gain] ?? 0, Math.ceil(gap / gain));
		operations += used;
		gap -= used * gain;
	}
	return gap > 0 ? -1 : operations;
};
