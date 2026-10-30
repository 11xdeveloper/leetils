/**
 * 2501. Longest Square Streak in an Array
 *
 * A square streak is a subsequence of at least two numbers where, once
 * sorted, each number is the square of the one before. Returns the longest
 * streak's length, or -1 if there is none.
 *
 * Put the numbers in a set and, from each one, follow squares while they
 * are present.
 *
 * @see https://leetcode.com/problems/longest-square-streak-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n log log m), where `m` is the largest number
 * @spaceComplexity O(n)
 *
 * @example
 * longestSquareStreakInAnArray([4, 3, 6, 16, 8, 2]); // 3
 */
export const longestSquareStreakInAnArray = (
	nums: readonly number[],
): number => {
	const present = new Set(nums);
	let best = 0;
	for (const start of present) {
		let length = 0;
		for (let x = start; present.has(x); x *= x) length++;
		best = Math.max(best, length);
	}
	return best >= 2 ? best : -1;
};
