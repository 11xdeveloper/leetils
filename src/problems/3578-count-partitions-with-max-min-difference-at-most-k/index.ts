const MOD = 1_000_000_007;

/**
 * 3578. Count Partitions With Max-Min Difference at Most K
 *
 * Counts the ways to split `nums` into contiguous segments whose maximum
 * and minimum differ by at most `k`, modulo 1e9+7.
 *
 * The ways to split the first i + 1 elements sum the ways for every valid
 * start of the last segment, which form a window that only moves right.
 * Track the window's max and min with monotonic deques, and sum the ways
 * with prefix sums.
 *
 * @see https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countPartitionsWithMaxMinDifferenceAtMostK([9, 4, 1, 3, 7], 4); // 6
 */
export const countPartitionsWithMaxMinDifferenceAtMostK = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	// prefix[i]: ways to split the first j elements, summed for j < i.
	const prefix = [0, 1];
	const highs: number[] = [];
	const lows: number[] = [];
	let [highHead, lowHead, left] = [0, 0, 0];
	let ways = 0;
	for (let i = 0; i < n; i++) {
		const value = nums[i] ?? 0;
		while (highs.length > highHead && (nums[highs.at(-1) ?? 0] ?? 0) <= value)
			highs.pop();
		highs.push(i);
		while (lows.length > lowHead && (nums[lows.at(-1) ?? 0] ?? 0) >= value)
			lows.pop();
		lows.push(i);
		while (
			(nums[highs[highHead] ?? 0] ?? 0) - (nums[lows[lowHead] ?? 0] ?? 0) >
			k
		) {
			left++;
			if ((highs[highHead] ?? 0) < left) highHead++;
			if ((lows[lowHead] ?? 0) < left) lowHead++;
		}
		ways = ((prefix[i + 1] ?? 0) - (prefix[left] ?? 0) + MOD) % MOD;
		prefix.push(((prefix[i + 1] ?? 0) + ways) % MOD);
	}
	return ways;
};
