/**
 * 1215. Stepping Numbers
 *
 * A stepping number's neighbouring digits differ by exactly 1. Returns the
 * stepping numbers from `low` to `high`, in order.
 *
 * Builds them digit by digit: every stepping number is a shorter one with a
 * digit one above or below its last appended. Going breadth-first from the
 * single digits produces them in increasing order, and there are only a
 * few thousand below 2 · 10^9.
 *
 * @see https://leetcode.com/problems/stepping-numbers/
 * @difficulty Medium
 * @timeComplexity O(s) for the s stepping numbers up to high
 * @spaceComplexity O(s)
 *
 * @example
 * steppingNumbers(0, 21); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21]
 */
export const steppingNumbers = (low: number, high: number): number[] => {
	const result = low === 0 ? [0] : [];
	const queue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = 0; i < queue.length; i++) {
		const value = queue[i] ?? 0;
		if (value > high) break;
		if (value >= low) result.push(value);
		const last = value % 10;
		if (last > 0) queue.push(value * 10 + last - 1);
		if (last < 9) queue.push(value * 10 + last + 1);
	}
	return result;
};
