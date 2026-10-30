/**
 * 2420. Find All Good Indices
 *
 * Index `i` is good when the `k` elements before it are non-increasing and
 * the `k` after it non-decreasing. Returns the good indices, ascending.
 *
 * Precompute the run lengths ending just before and starting just after
 * each index.
 *
 * @see https://leetcode.com/problems/find-all-good-indices/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findAllGoodIndices([2, 1, 1, 1, 3, 4, 1], 2); // [2, 3]
 */
export const findAllGoodIndices = (
	nums: readonly number[],
	k: number,
): number[] => {
	const n = nums.length;
	const falling = new Array<number>(n).fill(1);
	const rising = new Array<number>(n).fill(1);
	for (let i = 1; i < n; i++)
		if ((nums[i] ?? 0) <= (nums[i - 1] ?? 0))
			falling[i] = (falling[i - 1] ?? 0) + 1;
	for (let i = n - 2; i >= 0; i--)
		if ((nums[i] ?? 0) <= (nums[i + 1] ?? 0))
			rising[i] = (rising[i + 1] ?? 0) + 1;
	const good: number[] = [];
	for (let i = k; i < n - k; i++)
		if ((falling[i - 1] ?? 0) >= k && (rising[i + 1] ?? 0) >= k) good.push(i);
	return good;
};
