/**
 * 2568. Minimum Impossible OR
 *
 * Returns the smallest positive integer that isn't the bitwise OR of some
 * subsequence of `nums`.
 *
 * Every power of two present lets you build any number made of present
 * powers, and a missing power can't be built from anything else, since
 * any number containing that bit is larger. So it's the smallest missing
 * power of two.
 *
 * @see https://leetcode.com/problems/minimum-impossible-or/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumImpossibleOr([5, 3, 2]); // 1
 */
export const minimumImpossibleOr = (nums: readonly number[]): number => {
	const present = new Set(nums);
	let power = 1;
	while (present.has(power)) power *= 2;
	return power;
};
