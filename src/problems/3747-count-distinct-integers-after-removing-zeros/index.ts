/**
 * 3747. Count Distinct Integers After Removing Zeros
 *
 * Delete the zero digits from every integer from 1 to `n`. Counts the
 * distinct results.
 *
 * Each result is a zero-free number, and the smallest number producing it
 * is itself, so count the zero-free numbers up to n digit by digit.
 *
 * @see https://leetcode.com/problems/count-distinct-integers-after-removing-zeros/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * countDistinctIntegersAfterRemovingZeros(10); // 9
 */
export const countDistinctIntegersAfterRemovingZeros = (n: number): number => {
	const digits = String(n);
	const length = digits.length;
	// Shorter numbers: 9 choices per digit.
	let count = 0;
	for (let l = 1; l < length; l++) count += 9 ** l;
	for (let i = 0; i < length; i++) {
		const d = Number(digits[i]);
		if (d > 1) count += (d - 1) * 9 ** (length - 1 - i);
		if (d === 0) return count;
	}
	return count + 1;
};
