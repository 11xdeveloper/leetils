/**
 * 869. Reordered Power of 2
 *
 * Returns whether the digits of `n` can be rearranged (without a leading
 * zero) into a power of two.
 *
 * Compares `n`'s sorted digits with those of every power of two up to
 * 10^9; a rearrangement with the same digits as a power of two never needs
 * a leading zero, since the power of two itself doesn't have one.
 *
 * @see https://leetcode.com/problems/reordered-power-of-2/
 * @difficulty Medium
 * @timeComplexity O(log n) for the 31 powers
 * @spaceComplexity O(1)
 *
 * @example
 * reorderedPowerOf2(46); // true: 64
 */
export const reorderedPowerOf2 = (n: number): boolean => {
	const signature = (value: number): string =>
		[...String(value)].sort().join("");
	const target = signature(n);
	for (let power = 1; power <= 1e9; power *= 2)
		if (signature(power) === target) return true;
	return false;
};
