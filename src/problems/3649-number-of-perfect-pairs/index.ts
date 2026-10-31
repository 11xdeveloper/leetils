/**
 * 3649. Number of Perfect Pairs
 *
 * A pair i < j with a = `nums[i]` and b = `nums[j]` is perfect if
 * min(|a - b|, |a + b|) ≤ min(|a|, |b|) and max(|a - b|, |a + b|) ≥
 * max(|a|, |b|). Counts the perfect pairs.
 *
 * In absolute values x ≤ y, those sides are y - x and x + y, so the second
 * condition always holds and the first says y ≤ 2x. Sort the absolute
 * values and count with two pointers.
 *
 * @see https://leetcode.com/problems/number-of-perfect-pairs/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfPerfectPairs([-3, 2, -1, 4]); // 4
 */
export const numberOfPerfectPairs = (nums: readonly number[]): number => {
	const sorted = nums.map(Math.abs).sort((a, b) => a - b);
	let count = 0;
	let start = 0;
	sorted.forEach((y, j) => {
		while (2 * (sorted[start] ?? 0) < y) start++;
		count += j - start;
	});
	return count;
};
