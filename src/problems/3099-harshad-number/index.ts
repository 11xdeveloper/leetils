/**
 * 3099. Harshad Number
 *
 * The digit sum of `x` if `x` is divisible by it (a Harshad number), or -1
 * otherwise.
 *
 * Add up the digits and check.
 *
 * @see https://leetcode.com/problems/harshad-number/
 * @difficulty Easy
 * @timeComplexity O(log x)
 * @spaceComplexity O(1)
 *
 * @example
 * harshadNumber(18); // 9
 */
export const harshadNumber = (x: number): number => {
	let sum = 0;
	for (let rest = x; rest > 0; rest = Math.floor(rest / 10)) sum += rest % 10;
	return x % sum === 0 ? sum : -1;
};
