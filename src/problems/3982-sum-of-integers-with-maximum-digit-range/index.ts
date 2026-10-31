/**
 * 3982. Sum of Integers with Maximum Digit Range
 *
 * A number's digit range is its largest digit minus its smallest. Adds up
 * the elements whose digit range is the largest in `nums`.
 *
 * @see https://leetcode.com/problems/sum-of-integers-with-maximum-digit-range/
 * @difficulty Easy
 * @timeComplexity O(n log V)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfIntegersWithMaximumDigitRange([5724, 111, 350]); // 6074
 */
export const sumOfIntegersWithMaximumDigitRange = (
	nums: readonly number[],
): number => {
	const range = (x: number) => {
		const digits = [...String(x)].map(Number);
		return Math.max(...digits) - Math.min(...digits);
	};
	const ranges = nums.map(range);
	const widest = Math.max(...ranges);
	return nums.reduce((sum, x, i) => (ranges[i] === widest ? sum + x : sum), 0);
};
