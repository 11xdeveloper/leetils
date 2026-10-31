/**
 * 3133. Minimum Array End
 *
 * The smallest possible last element of a strictly increasing array of `n`
 * positive integers whose bitwise AND is `x`.
 *
 * Every element has all of `x`'s bits, and the free bits count upwards, so
 * the last element is `x` with the bits of n - 1 written into its zero bits
 * from the bottom. Uses BigInt, since the result can pass 2³¹.
 *
 * @see https://leetcode.com/problems/minimum-array-end/
 * @difficulty Medium
 * @timeComplexity O(log n + log x)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumArrayEnd(3, 4); // 6
 */
export const minimumArrayEnd = (n: number, x: number): number => {
	let result = BigInt(x);
	let rest = BigInt(n - 1);
	for (let bit = 1n; rest > 0n; bit <<= 1n)
		if ((result & bit) === 0n) {
			if (rest & 1n) result |= bit;
			rest >>= 1n;
		}
	return Number(result);
};
