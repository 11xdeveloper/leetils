/**
 * 263. Ugly Number
 *
 * Returns whether `n` is an ugly number: a positive integer whose only
 * prime factors are 2, 3 and 5. 1 counts as ugly.
 *
 * Divides out every factor of 2, 3 and 5; what's left is 1 exactly when
 * there were no other prime factors.
 *
 * @see https://leetcode.com/problems/ugly-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * uglyNumber(6); // true: 2 × 3
 * uglyNumber(14); // false: 14 has the factor 7
 */
export const uglyNumber = (n: number): boolean => {
	if (n <= 0) return false;
	let rest = n;
	for (const factor of [2, 3, 5]) {
		while (rest % factor === 0) rest /= factor;
	}
	return rest === 1;
};
