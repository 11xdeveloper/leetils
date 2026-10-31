/**
 * 3870. Count Commas in Range
 *
 * Counts the thousands separators used writing every integer from 1 to
 * `n`: each number from 10^(3t) up gets its t-th comma.
 *
 * @see https://leetcode.com/problems/count-commas-in-range/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countCommasInRange(1002); // 3
 */
export const countCommasInRange = (n: number): number => {
	let commas = 0;
	for (let start = 1000; start <= n; start *= 1000) commas += n - start + 1;
	return commas;
};
