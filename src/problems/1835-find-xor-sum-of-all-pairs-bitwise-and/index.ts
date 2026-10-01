/**
 * 1835. Find XOR Sum of All Pairs Bitwise AND
 *
 * Returns the XOR of `arr1[i] AND arr2[j]` over all pairs.
 *
 * AND distributes over XOR, so this is `(XOR of arr1) AND (XOR of arr2)`.
 *
 * @see https://leetcode.com/problems/find-xor-sum-of-all-pairs-bitwise-and/
 * @difficulty Hard
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * findXorSumOfAllPairsBitwiseAnd([1, 2, 3], [6, 5]); // 0
 */
export const findXorSumOfAllPairsBitwiseAnd = (
	arr1: readonly number[],
	arr2: readonly number[],
): number => arr1.reduce((x, v) => x ^ v, 0) & arr2.reduce((x, v) => x ^ v, 0);
