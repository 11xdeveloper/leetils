/**
 * 2171. Removing Minimum Number of Magic Beans
 *
 * Removes beans from bags so every non-empty bag holds the same number.
 * Returns the fewest beans removed.
 *
 * Keeping level `beans[i]` (sorted) empties the smaller bags and trims the
 * larger ones, keeping `beans[i] · (n - i)` beans.
 *
 * @see https://leetcode.com/problems/removing-minimum-number-of-magic-beans/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * removingMinimumNumberOfMagicBeans([4, 1, 6, 5]); // 4
 */
export const removingMinimumNumberOfMagicBeans = (
	beans: readonly number[],
): number => {
	const sorted = beans.toSorted((a, b) => a - b);
	const total = sorted.reduce((sum, b) => sum + b, 0);
	return Math.min(
		...sorted.map((level, i) => total - level * (sorted.length - i)),
	);
};
