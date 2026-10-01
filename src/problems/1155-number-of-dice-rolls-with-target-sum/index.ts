/**
 * 1155. Number of Dice Rolls With Target Sum
 *
 * Returns the number of ways `n` dice with faces `1 … k` can roll a total
 * of `target`, modulo 10^9 + 7.
 *
 * Dynamic programming over dice: `ways[s]` counts rolls of the dice so far
 * totalling `s`. A sliding window sum over the last `k` totals adds one more
 * die in linear time.
 *
 * @see https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/
 * @difficulty Medium
 * @timeComplexity O(n · target)
 * @spaceComplexity O(target)
 *
 * @example
 * numberOfDiceRollsWithTargetSum(2, 6, 7); // 6
 */
export const numberOfDiceRollsWithTargetSum = (
	n: number,
	k: number,
	target: number,
): number => {
	const MOD = 1_000_000_007;
	let ways = new Array<number>(target + 1).fill(0);
	ways[0] = 1;
	for (let die = 0; die < n; die++) {
		const next = new Array<number>(target + 1).fill(0);
		let window = 0;
		for (let sum = 1; sum <= target; sum++) {
			window = (window + (ways[sum - 1] ?? 0)) % MOD;
			if (sum - 1 - k >= 0)
				window = (window - (ways[sum - 1 - k] ?? 0) + MOD) % MOD;
			next[sum] = window;
		}
		ways = next;
	}
	return ways[target] ?? 0;
};
