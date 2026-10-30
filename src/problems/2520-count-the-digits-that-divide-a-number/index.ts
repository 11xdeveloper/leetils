/**
 * 2520. Count the Digits That Divide a Number
 *
 * Returns how many of `num`'s digits divide it, counting repeats.
 *
 * Check each digit; `num` has none that are zero.
 *
 * @see https://leetcode.com/problems/count-the-digits-that-divide-a-number/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheDigitsThatDivideANumber(1248); // 4
 */
export const countTheDigitsThatDivideANumber = (num: number): number => {
	let count = 0;
	for (let rest = num; rest > 0; rest = Math.floor(rest / 10))
		if (num % (rest % 10) === 0) count++;
	return count;
};
