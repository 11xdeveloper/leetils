/**
 * 634. Find the Derangement of An Array
 *
 * Counts the derangements of 1 to `n`: permutations where no number stays
 * in its original position. Returns the count modulo 10^9 + 7.
 *
 * `D(n) = (n - 1) · (D(n - 1) + D(n - 2))`: the number in position 1 goes
 * to one of `n - 1` other positions `i`, and then either `i` goes to
 * position 1 (leaving `n - 2` to derange) or it doesn't (like deranging
 * `n - 1`). The products stay below 2^53 before reducing.
 *
 * @see https://leetcode.com/problems/find-the-derangement-of-an-array/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheDerangementOfAnArray(3); // 2: [2, 3, 1] and [3, 1, 2]
 */
export const findTheDerangementOfAnArray = (n: number): number => {
	const MOD = 1_000_000_007;
	let [previous, current] = [1, 0];
	for (let size = 2; size <= n; size++)
		[previous, current] = [current, ((size - 1) * (previous + current)) % MOD];
	return current;
};
