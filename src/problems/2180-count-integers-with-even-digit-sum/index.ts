/**
 * 2180. Count Integers With Even Digit Sum
 *
 * Counts the positive integers up to `num` whose digits have an even sum.
 *
 * Check each one (`num` is at most 1000).
 *
 * @see https://leetcode.com/problems/count-integers-with-even-digit-sum/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countIntegersWithEvenDigitSum(30); // 14
 */
export const countIntegersWithEvenDigitSum = (num: number): number => {
	let count = 0;
	for (let x = 1; x <= num; x++) {
		let sum = 0;
		for (let rest = x; rest > 0; rest = Math.floor(rest / 10)) sum += rest % 10;
		if (sum % 2 === 0) count++;
	}
	return count;
};
