/**
 * 967. Numbers With Same Consecutive Differences
 *
 * Returns every `n`-digit number (no leading zeros) whose neighbouring
 * digits differ by exactly `k`, in increasing order.
 *
 * Builds the numbers digit by digit from each leading digit 1–9, extending
 * with `last ± k` when that's a digit.
 *
 * @see https://leetcode.com/problems/numbers-with-same-consecutive-differences/
 * @difficulty Medium
 * @timeComplexity O(2^n) numbers
 * @spaceComplexity O(2^n)
 *
 * @example
 * numbersWithSameConsecutiveDifferences(3, 7); // [181, 292, 707, 818, 929]
 */
export const numbersWithSameConsecutiveDifferences = (
	n: number,
	k: number,
): number[] => {
	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let length = 1; length < n; length++) {
		numbers = numbers.flatMap((num) => {
			const last = num % 10;
			const digits = new Set(
				[last - k, last + k].filter((digit) => digit >= 0 && digit <= 9),
			);
			return [...digits].map((digit) => num * 10 + digit);
		});
	}
	return numbers.sort((a, b) => a - b);
};
