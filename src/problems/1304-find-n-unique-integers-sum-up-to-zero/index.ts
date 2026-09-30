/**
 * 1304. Find N Unique Integers Sum up to Zero
 *
 * Returns `n` distinct integers that add up to 0.
 *
 * Pairs `k` with `−k`, adding 0 when `n` is odd.
 *
 * @see https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * findNUniqueIntegersSumUpToZero(5); // [1, -1, 2, -2, 0]
 */
export const findNUniqueIntegersSumUpToZero = (n: number): number[] => {
	const result: number[] = [];
	for (let k = 1; k <= n / 2; k++) result.push(k, -k);
	if (n % 2 === 1) result.push(0);
	return result;
};
