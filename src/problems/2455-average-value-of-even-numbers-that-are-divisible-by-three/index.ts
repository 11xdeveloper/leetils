/**
 * 2455. Average Value of Even Numbers That Are Divisible by Three
 *
 * Returns the rounded-down average of the numbers divisible by 6, or 0.
 *
 * @see https://leetcode.com/problems/average-value-of-even-numbers-that-are-divisible-by-three/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * averageValueOfEvenNumbersThatAreDivisibleByThree([1, 3, 6, 10, 12, 15]); // 9
 */
export const averageValueOfEvenNumbersThatAreDivisibleByThree = (
	nums: readonly number[],
): number => {
	const chosen = nums.filter((num) => num % 6 === 0);
	return chosen.length
		? Math.floor(chosen.reduce((sum, v) => sum + v, 0) / chosen.length)
		: 0;
};
