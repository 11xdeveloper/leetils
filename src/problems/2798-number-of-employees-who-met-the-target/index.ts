/**
 * 2798. Number of Employees Who Met the Target
 *
 * Returns how many employees worked at least `target` hours.
 *
 * Count them.
 *
 * @see https://leetcode.com/problems/number-of-employees-who-met-the-target/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfEmployeesWhoMetTheTarget([0, 1, 2, 3, 4], 2); // 3
 */
export const numberOfEmployeesWhoMetTheTarget = (
	hours: readonly number[],
	target: number,
): number => hours.filter((h) => h >= target).length;
