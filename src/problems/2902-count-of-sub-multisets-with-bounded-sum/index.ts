const MOD = 1_000_000_007;

/**
 * 2902. Count of Sub-Multisets With Bounded Sum
 *
 * Returns how many sub-multisets of `nums` have a sum in `[l, r]`,
 * modulo 1e9 + 7.
 *
 * Bounded knapsack over distinct values: taking 0 to `c` copies of `v`
 * is a sliding window over sums with the same remainder modulo `v`,
 * updated with running sums. Zeros multiply the count by `zeros + 1`.
 *
 * @see https://leetcode.com/problems/count-of-sub-multisets-with-bounded-sum/
 * @difficulty Hard
 * @timeComplexity O(r · √S), where `S` is the total sum
 * @spaceComplexity O(r)
 *
 * @example
 * countOfSubMultisetsWithBoundedSum([1, 2, 1, 3, 5, 2], 3, 5); // 9
 */
export const countOfSubMultisetsWithBoundedSum = (
	nums: readonly number[],
	l: number,
	r: number,
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let ways = Array.from({ length: r + 1 }, (_, sum): number =>
		sum === 0 ? 1 : 0,
	);
	for (const [value, count] of counts) {
		if (value === 0) continue;
		const next = [...ways];
		for (let sum = value; sum <= r; sum++) {
			const dropped = sum - (count + 1) * value;
			next[sum] =
				((next[sum - value] ?? 0) +
					(ways[sum] ?? 0) -
					(dropped >= 0 ? (ways[dropped] ?? 0) : 0) +
					MOD) %
				MOD;
		}
		ways = next;
	}
	const zeros = (counts.get(0) ?? 0) + 1;
	let total = 0;
	for (let sum = l; sum <= r; sum++) total = (total + (ways[sum] ?? 0)) % MOD;
	return (total * zeros) % MOD;
};
