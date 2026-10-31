const MOD = 1_000_000_007;

/**
 * 3583. Count Special Triplets
 *
 * Counts index triples i < j < k with `nums[i]` and `nums[k]` both twice
 * `nums[j]`, modulo 1e9+7.
 *
 * For each middle index, multiply how often its double appears before it
 * by how often after it.
 *
 * @see https://leetcode.com/problems/count-special-triplets/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSpecialTriplets([6, 3, 6]); // 1
 */
export const countSpecialTriplets = (nums: readonly number[]): number => {
	const before = new Map<number, number>();
	const after = new Map<number, number>();
	for (const num of nums) after.set(num, (after.get(num) ?? 0) + 1);
	let count = 0;
	for (const num of nums) {
		after.set(num, (after.get(num) ?? 0) - 1);
		count =
			(count +
				(((before.get(2 * num) ?? 0) * (after.get(2 * num) ?? 0)) % MOD)) %
			MOD;
		before.set(num, (before.get(num) ?? 0) + 1);
	}
	return count;
};
