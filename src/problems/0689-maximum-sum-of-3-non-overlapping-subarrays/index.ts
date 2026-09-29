/**
 * 689. Maximum Sum of 3 Non-Overlapping Subarrays
 *
 * Finds three non-overlapping subarrays of length `k` with the largest
 * total and returns their starting indices, the lexicographically smallest
 * on a tie.
 *
 * With every window's sum precomputed, it fixes the middle window and pairs
 * it with the best window entirely to its left and entirely to its right.
 * Those come from running bests in each direction, which prefer the
 * leftmost window on ties.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOf3NonOverlappingSubarrays([1, 2, 1, 2, 6, 7, 5, 1], 2); // [0, 3, 5]
 */
export const maximumSumOf3NonOverlappingSubarrays = (
	nums: readonly number[],
	k: number,
): number[] => {
	const windows = nums.length - k + 1;
	const sums = new Array<number>(windows).fill(0);
	let sum = 0;
	for (const [i, num] of nums.entries()) {
		sum += num;
		if (i >= k) sum -= nums[i - k] ?? 0;
		if (i >= k - 1) sums[i - k + 1] = sum;
	}
	const at = (i: number): number => sums[i] ?? 0;

	// bestLeft[i]: the best window starting at or before i; bestRight[i]: at or after i.
	const bestLeft = new Array<number>(windows).fill(0);
	for (let i = 1; i < windows; i++)
		bestLeft[i] = at(i) > at(bestLeft[i - 1] ?? 0) ? i : (bestLeft[i - 1] ?? 0);
	const bestRight = new Array<number>(windows).fill(windows - 1);
	for (let i = windows - 2; i >= 0; i--)
		bestRight[i] =
			at(i) >= at(bestRight[i + 1] ?? 0) ? i : (bestRight[i + 1] ?? 0);

	let best: number[] = [];
	let bestTotal = Number.NEGATIVE_INFINITY;
	for (let middle = k; middle + k < windows; middle++) {
		const left = bestLeft[middle - k] ?? 0;
		const right = bestRight[middle + k] ?? 0;
		const total = at(left) + at(middle) + at(right);
		if (total > bestTotal) {
			bestTotal = total;
			best = [left, middle, right];
		}
	}
	return best;
};
