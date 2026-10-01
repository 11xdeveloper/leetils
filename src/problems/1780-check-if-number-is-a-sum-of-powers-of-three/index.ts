/**
 * 1780. Check if Number is a Sum of Powers of Three
 *
 * Returns whether `n` is a sum of distinct powers of three.
 *
 * Exactly when no base-3 digit of `n` is 2.
 *
 * @see https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfNumberIsASumOfPowersOfThree(91); // true
 */
export const checkIfNumberIsASumOfPowersOfThree = (n: number): boolean => {
	for (let rest = n; rest > 0; rest = Math.floor(rest / 3))
		if (rest % 3 === 2) return false;
	return true;
};
