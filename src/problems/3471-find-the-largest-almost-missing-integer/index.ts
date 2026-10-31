/**
 * 3471. Find the Largest Almost Missing Integer
 *
 * The largest value that appears in exactly one subarray of length `k`, or
 * -1.
 *
 * With k equal to the length, every value qualifies. With k = 1, values
 * appearing once do. Otherwise only the first or last element can, and
 * only if it appears nowhere else.
 *
 * @see https://leetcode.com/problems/find-the-largest-almost-missing-integer/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheLargestAlmostMissingInteger([3, 9, 2, 1, 7], 3); // 7
 */
export const findTheLargestAlmostMissingInteger = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	if (k === n) return Math.max(...nums);
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const once = (value: number | undefined): boolean =>
		value !== undefined && counts.get(value) === 1;
	if (k === 1) return Math.max(-1, ...nums.filter(once));
	return Math.max(
		-1,
		...[nums[0], nums[n - 1]].filter(once).map((v) => v ?? -1),
	);
};
