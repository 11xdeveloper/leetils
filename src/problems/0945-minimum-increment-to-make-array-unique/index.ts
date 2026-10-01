/**
 * 945. Minimum Increment to Make Array Unique
 *
 * A move increments one element by 1. Returns the fewest moves to make
 * every element of `nums` distinct.
 *
 * After sorting, each element must be at least one more than the one
 * before it, so it's raised to that if needed.
 *
 * @see https://leetcode.com/problems/minimum-increment-to-make-array-unique/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * minimumIncrementToMakeArrayUnique([3, 2, 1, 2, 1, 7]); // 6
 */
export const minimumIncrementToMakeArrayUnique = (
	nums: readonly number[],
): number => {
	let moves = 0;
	let next = Number.NEGATIVE_INFINITY;
	for (const num of nums.toSorted((a, b) => a - b)) {
		const target = Math.max(num, next);
		moves += target - num;
		next = target + 1;
	}
	return moves;
};
