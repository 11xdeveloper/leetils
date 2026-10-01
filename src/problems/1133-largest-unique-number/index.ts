/**
 * 1133. Largest Unique Number
 *
 * Returns the largest value that appears exactly once in `nums`, or -1 if
 * there isn't one.
 *
 * Counts each value, then takes the largest with a count of one.
 *
 * @see https://leetcode.com/problems/largest-unique-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestUniqueNumber([5, 7, 3, 9, 4, 9, 8, 3, 1]); // 8
 */
export const largestUniqueNumber = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let largest = -1;
	for (const [num, count] of counts) {
		if (count === 1) largest = Math.max(largest, num);
	}
	return largest;
};
