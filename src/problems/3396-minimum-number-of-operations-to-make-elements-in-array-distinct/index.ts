/**
 * 3396. Minimum Number of Operations to Make Elements in Array Distinct
 *
 * Each operation removes the first three elements of `nums` (or all of
 * them, if fewer remain). Returns the fewest operations to leave only
 * distinct elements.
 *
 * Scan from the end for the last element that repeats something after it;
 * everything up to it must go, three at a time.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-elements-in-array-distinct/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToMakeElementsInArrayDistinct([1, 2, 3, 4, 2, 3, 3, 5, 7]); // 2
 */
export const minimumNumberOfOperationsToMakeElementsInArrayDistinct = (
	nums: readonly number[],
): number => {
	const seen = new Set<number>();
	for (let i = nums.length - 1; i >= 0; i--) {
		const num = nums[i] ?? 0;
		if (seen.has(num)) return Math.ceil((i + 1) / 3);
		seen.add(num);
	}
	return 0;
};
