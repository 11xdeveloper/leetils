/**
 * 2231. Largest Number After Digit Swaps by Parity
 *
 * Swapping any two digits of the same parity, returns the largest number
 * `num` can become.
 *
 * Odd digits keep the odd positions and even digits the even ones, so put
 * each group's digits in descending order.
 *
 * @see https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/
 * @difficulty Easy
 * @timeComplexity O(d log d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * largestNumberAfterDigitSwapsByParity(1234); // 3412
 */
export const largestNumberAfterDigitSwapsByParity = (num: number): number => {
	const digits = [...String(num)].map(Number);
	const byParity = [0, 1].map((parity) =>
		digits.filter((d) => d % 2 === parity).sort((a, b) => a - b),
	);
	return Number(digits.map((d) => byParity[d % 2]?.pop() ?? 0).join(""));
};
