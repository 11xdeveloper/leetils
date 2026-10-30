/**
 * 2169. Count Operations to Obtain Zero
 *
 * An operation subtracts the smaller of `num1` and `num2` from the larger.
 * Returns the operations until either is zero.
 *
 * Run the subtractions in bulk, as in Euclid's algorithm.
 *
 * @see https://leetcode.com/problems/count-operations-to-obtain-zero/
 * @difficulty Easy
 * @timeComplexity O(log max)
 * @spaceComplexity O(1)
 *
 * @example
 * countOperationsToObtainZero(2, 3); // 3
 */
export const countOperationsToObtainZero = (
	num1: number,
	num2: number,
): number => {
	let operations = 0;
	while (num1 && num2) {
		if (num1 < num2) [num1, num2] = [num2, num1];
		operations += Math.floor(num1 / num2);
		num1 %= num2;
	}
	return operations;
};
