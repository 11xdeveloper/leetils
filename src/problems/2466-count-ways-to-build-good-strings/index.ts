/**
 * 2466. Count Ways To Build Good Strings
 *
 * Builds strings by appending `zero` 0s or `one` 1s at a time. Counts the
 * distinct strings with length between `low` and `high`, modulo
 * 10^9 + 7.
 *
 * `ways[len]` counts strings of each length.
 *
 * @see https://leetcode.com/problems/count-ways-to-build-good-strings/
 * @difficulty Medium
 * @timeComplexity O(high)
 * @spaceComplexity O(high)
 *
 * @example
 * countWaysToBuildGoodStrings(2, 3, 1, 2); // 5
 */
export const countWaysToBuildGoodStrings = (
	low: number,
	high: number,
	zero: number,
	one: number,
): number => {
	const MOD = 1_000_000_007;
	const ways = new Array<number>(high + 1).fill(0);
	ways[0] = 1;
	let total = 0;
	for (let length = 1; length <= high; length++) {
		ways[length] =
			((ways[length - zero] ?? 0) + (ways[length - one] ?? 0)) % MOD;
		if (length >= low) total = (total + (ways[length] ?? 0)) % MOD;
	}
	return total;
};
