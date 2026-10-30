/**
 * 2320. Count Number of Ways to Place Houses
 *
 * Each side of a street has `n` plots; houses on the same side can't be
 * adjacent. Counts the placements, modulo 10^9 + 7.
 *
 * The sides are independent, and one side's count follows the Fibonacci
 * recurrence; square it.
 *
 * @see https://leetcode.com/problems/count-number-of-ways-to-place-houses/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumberOfWaysToPlaceHouses(2); // 9
 */
export const countNumberOfWaysToPlaceHouses = (n: number): number => {
	const MOD = 1_000_000_007n;
	let [empty, built] = [1n, 1n];
	for (let plot = 2; plot <= n; plot++)
		[empty, built] = [(empty + built) % MOD, empty];
	const side = (empty + built) % MOD;
	return Number((side * side) % MOD);
};
