/**
 * 3779. Minimum Number of Operations to Have Distinct Elements
 *
 * One operation removes the first three elements (or all, if fewer).
 * Returns the fewest operations leaving only distinct elements.
 *
 * Scanning from the right, the first value already seen marks the last
 * index that must go; removing it takes ⌊i / 3⌋ + 1 operations.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-have-distinct-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfOperationsToHaveDistinctElements([3, 8, 3, 6, 5, 8]); // 1
 */
export const minimumNumberOfOperationsToHaveDistinctElements = (
	nums: readonly number[],
): number => {
	const seen = new Set<number>();
	for (let i = nums.length - 1; i >= 0; i--) {
		const num = nums[i] ?? 0;
		if (seen.has(num)) return Math.floor(i / 3) + 1;
		seen.add(num);
	}
	return 0;
};
