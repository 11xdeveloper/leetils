/**
 * 3599. Partition Array to Minimize XOR
 *
 * Split `nums` into `k` non-empty contiguous parts, minimising the largest
 * XOR of a part. Returns that value.
 *
 * Dynamic programming over prefix length and parts used, with prefix XORs
 * giving each part's XOR.
 *
 * @see https://leetcode.com/problems/partition-array-to-minimize-xor/
 * @difficulty Medium
 * @timeComplexity O(n² · k)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayToMinimizeXor([1, 2, 3], 2); // 1
 */
export const partitionArrayToMinimizeXor = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) ^ num);
	let best = prefix.map((value, i) =>
		i === 0 ? Number.POSITIVE_INFINITY : value,
	);
	for (let parts = 2; parts <= k; parts++) {
		const next = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
		for (let i = parts; i <= n; i++)
			for (let j = parts - 1; j < i; j++)
				next[i] = Math.min(
					next[i] ?? 0,
					Math.max(best[j] ?? 0, (prefix[i] ?? 0) ^ (prefix[j] ?? 0)),
				);
		best = next;
	}
	return best[n] ?? 0;
};
