/**
 * 2344. Minimum Deletions to Make Array Divisible
 *
 * Deletes elements of `nums` until its smallest divides every element of
 * `numsDivide`. Returns the fewest deletions, or -1.
 *
 * The smallest must divide the gcd of `numsDivide`; delete everything
 * smaller than the least element that does.
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-array-divisible/
 * @difficulty Hard
 * @timeComplexity O(n log n + m log max)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDeletionsToMakeArrayDivisible([2, 3, 2, 4, 3], [9, 6, 9, 3, 15]); // 2
 */
export const minimumDeletionsToMakeArrayDivisible = (
	nums: readonly number[],
	numsDivide: readonly number[],
): number => {
	const gcd = (a: number, b: number): number => {
		while (b) [a, b] = [b, a % b];
		return a;
	};
	const g = numsDivide.reduce(gcd, 0);
	return nums.toSorted((a, b) => a - b).findIndex((num) => g % num === 0);
};
