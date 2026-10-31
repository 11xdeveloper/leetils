/**
 * 3895. Count Digit Appearances
 *
 * Counts how often `digit` appears across the decimal forms of `nums`.
 *
 * @see https://leetcode.com/problems/count-digit-appearances/
 * @difficulty Medium
 * @timeComplexity O(n log V)
 * @spaceComplexity O(1)
 *
 * @example
 * countDigitAppearances([12, 54, 32, 22], 2); // 4
 */
export const countDigitAppearances = (
	nums: readonly number[],
	digit: number,
): number => {
	let count = 0;
	for (const num of nums)
		for (const d of String(num)) if (Number(d) === digit) count++;
	return count;
};
