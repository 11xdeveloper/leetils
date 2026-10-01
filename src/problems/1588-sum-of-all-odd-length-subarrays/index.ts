/**
 * 1588. Sum of All Odd Length Subarrays
 *
 * Returns the total of the sums of all odd-length subarrays of `arr`.
 *
 * Element `i` lies in `(i + 1)(n − i)` subarrays, and `⌈that / 2⌉` of them
 * have odd length, so each element contributes its value that many times.
 *
 * @see https://leetcode.com/problems/sum-of-all-odd-length-subarrays/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfAllOddLengthSubarrays([1, 4, 2, 5, 3]); // 58
 */
export const sumOfAllOddLengthSubarrays = (arr: readonly number[]): number =>
	arr.reduce(
		(total, value, i) =>
			total + value * Math.ceil(((i + 1) * (arr.length - i)) / 2),
		0,
	);
