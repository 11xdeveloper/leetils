/**
 * 3945. Digit Frequency Score
 *
 * Adds d · freq(d) over the distinct digits d of `n`, which is just the
 * digit sum.
 *
 * @see https://leetcode.com/problems/digit-frequency-score/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * digitFrequencyScore(122); // 5
 */
export const digitFrequencyScore = (n: number): number => {
	let sum = 0;
	for (let x = n; x > 0; x = Math.floor(x / 10)) sum += x % 10;
	return sum;
};
