/**
 * 1342. Number of Steps to Reduce a Number to Zero
 *
 * Counts the steps to reach 0 from `num`, halving even numbers and
 * subtracting 1 from odd ones.
 *
 * Each bit costs one halving (except the top one), and each 1 bit costs a
 * subtraction, so it's the bit length plus the number of 1s, minus 1.
 *
 * @see https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/
 * @difficulty Easy
 * @timeComplexity O(log num)
 * @spaceComplexity O(log num)
 *
 * @example
 * numberOfStepsToReduceANumberToZero(14); // 6
 */
export const numberOfStepsToReduceANumberToZero = (num: number): number => {
	if (num === 0) return 0;
	const bits = num.toString(2);
	return bits.length + bits.split("1").length - 2;
};
