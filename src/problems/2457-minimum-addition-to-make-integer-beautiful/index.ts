/**
 * 2457. Minimum Addition to Make Integer Beautiful
 *
 * Returns the smallest `x >= 0` such that the digits of `n + x` sum to at
 * most `target`.
 *
 * While the digit sum is too large, round `n` up at the next digit: the
 * cheapest way to drop a nonzero last digit is to carry past it.
 *
 * @see https://leetcode.com/problems/minimum-addition-to-make-integer-beautiful/
 * @difficulty Medium
 * @timeComplexity O(d^2) for d digits
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAdditionToMakeIntegerBeautiful(467, 6); // 33
 */
export const minimumAdditionToMakeIntegerBeautiful = (
	n: number,
	target: number,
): number => {
	const digitSum = (value: number): number => {
		let sum = 0;
		for (let rest = value; rest > 0; rest = Math.floor(rest / 10))
			sum += rest % 10;
		return sum;
	};
	let [value, unit] = [n, 1];
	while (digitSum(value) > target) {
		unit *= 10;
		value = Math.ceil(value / unit) * unit;
	}
	return value - n;
};
