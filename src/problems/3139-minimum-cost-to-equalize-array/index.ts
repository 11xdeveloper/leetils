const MOD = 1_000_000_007n;

/**
 * 3139. Minimum Cost to Equalize Array
 *
 * Make every element of `nums` equal by increasing one element by 1 (for
 * `cost1`) or two different elements by 1 each (for `cost2`). Returns the
 * smallest cost, modulo 10⁹ + 7.
 *
 * For a target T, the total shortfall and the smallest element's shortfall
 * decide everything: pair up increments as much as possible (the smallest
 * element can only pair with the others' shortfalls) and pay singles for
 * the rest, unless pairs cost more than two singles. Raising T can help by
 * giving the smallest element more partners, but never beyond twice the
 * maximum, so try every T in between. Costs pass 2⁵³, so use BigInt.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-equalize-array/
 * @difficulty Hard
 * @timeComplexity O(n + max)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToEqualizeArray([4, 1], 5, 2); // 15
 */
export const minimumCostToEqualizeArray = (
	nums: readonly number[],
	cost1: number,
	cost2: number,
): number => {
	const n = BigInt(nums.length);
	const max = Math.max(...nums);
	const min = Math.min(...nums);
	const sum = BigInt(nums.reduce((a, b) => a + b, 0));
	const single = BigInt(cost1);
	const pair = BigInt(cost2);
	if (nums.length <= 2 || 2n * single <= pair)
		return Number(((BigInt(max) * n - sum) * single) % MOD);
	let best: bigint | undefined;
	for (let target = max; target <= 2 * max; target++) {
		const total = BigInt(target) * n - sum;
		const largest = BigInt(target - min);
		let cost: bigint;
		if (largest * 2n <= total)
			cost = (total / 2n) * pair + (total % 2n) * single;
		else {
			const pairs = total - largest;
			cost = pairs * pair + (largest - pairs) * single;
		}
		if (best === undefined || cost < best) best = cost;
	}
	return Number((best ?? 0n) % MOD);
};
