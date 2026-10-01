/**
 * 728. Self Dividing Numbers
 *
 * Returns the numbers from `left` to `right` that are divisible by each of
 * their digits (so they have no zero digit).
 *
 * Checks each number's digits in turn.
 *
 * @see https://leetcode.com/problems/self-dividing-numbers/
 * @difficulty Easy
 * @timeComplexity O((right - left) · log right)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * selfDividingNumbers(1, 22); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
 */
export const selfDividingNumbers = (left: number, right: number): number[] => {
	const result: number[] = [];
	for (let num = left; num <= right; num++) {
		let divides = true;
		for (let rest = num; rest > 0 && divides; rest = Math.floor(rest / 10)) {
			const digit = rest % 10;
			divides = digit !== 0 && num % digit === 0;
		}
		if (divides) result.push(num);
	}
	return result;
};
