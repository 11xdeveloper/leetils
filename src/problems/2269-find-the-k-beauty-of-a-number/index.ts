/**
 * 2269. Find the K-Beauty of a Number
 *
 * Counts the length-`k` substrings of `num`'s digits that are non-zero
 * divisors of `num`.
 *
 * @see https://leetcode.com/problems/find-the-k-beauty-of-a-number/
 * @difficulty Easy
 * @timeComplexity O(d · k) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * findTheKBeautyOfANumber(430043, 2); // 2
 */
export const findTheKBeautyOfANumber = (num: number, k: number): number => {
	const digits = String(num);
	let count = 0;
	for (let i = 0; i + k <= digits.length; i++) {
		const divisor = Number(digits.slice(i, i + k));
		if (divisor !== 0 && num % divisor === 0) count++;
	}
	return count;
};
