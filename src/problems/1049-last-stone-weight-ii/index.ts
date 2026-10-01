/**
 * 1049. Last Stone Weight II
 *
 * Smashing any two stones leaves their difference (or nothing if equal).
 * Returns the smallest possible weight of the last stone, or 0.
 *
 * Every outcome amounts to splitting the stones into two groups and taking
 * the difference of their totals, so it finds the achievable group total
 * closest to half the overall total with a subset-sum DP.
 *
 * @see https://leetcode.com/problems/last-stone-weight-ii/
 * @difficulty Medium
 * @timeComplexity O(n · total)
 * @spaceComplexity O(total)
 *
 * @example
 * lastStoneWeightII([2, 7, 4, 1, 8, 1]); // 1
 */
export const lastStoneWeightII = (stones: readonly number[]): number => {
	const total = stones.reduce((a, b) => a + b, 0);
	const half = Math.floor(total / 2);
	const reachable = new Uint8Array(half + 1);
	reachable[0] = 1;
	for (const stone of stones)
		for (let sum = half; sum >= stone; sum--)
			if (reachable[sum - stone]) reachable[sum] = 1;
	for (let sum = half; sum >= 0; sum--)
		if (reachable[sum]) return total - 2 * sum;
	return total;
};
