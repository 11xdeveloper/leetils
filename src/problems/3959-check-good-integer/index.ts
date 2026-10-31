/**
 * 3959. Check Good Integer
 *
 * Whether the sum of the squares of `n`'s digits exceeds their plain sum
 * by at least 50.
 *
 * @see https://leetcode.com/problems/check-good-integer/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkGoodInteger(19); // true
 */
export const checkGoodInteger = (n: number): boolean => {
	let difference = 0;
	for (let x = n; x > 0; x = Math.floor(x / 10))
		difference += (x % 10) * (x % 10) - (x % 10);
	return difference >= 50;
};
