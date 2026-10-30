/**
 * 2297. Jump Game VIII
 *
 * From `i` you may jump to `j > i` if `nums[i] <= nums[j]` and everything
 * between is smaller than `nums[i]`, or if `nums[i] > nums[j]` and
 * everything between is at least `nums[i]`. Landing on `j` costs
 * `costs[j]`. Returns the least cost to reach the last index from 0.
 *
 * The first rule allows only the next index with a value at least
 * `nums[i]`, and the second only the next smaller one; monotonic stacks
 * find both, leaving a DP over at most two jumps per index.
 *
 * @see https://leetcode.com/problems/jump-game-viii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameVIII([3, 2, 4, 4, 1], [3, 7, 6, 4, 2]); // 8
 */
export const jumpGameVIII = (
	nums: readonly number[],
	costs: readonly number[],
): number => {
	const n = nums.length;
	const jumps: number[][] = Array.from({ length: n }, () => []);
	const atLeast: number[] = [];
	const smaller: number[] = [];
	for (const [j, num] of nums.entries()) {
		while (atLeast.length && (nums[atLeast.at(-1) ?? 0] ?? 0) <= num)
			jumps[atLeast.pop() ?? 0]?.push(j);
		while (smaller.length && (nums[smaller.at(-1) ?? 0] ?? 0) > num)
			jumps[smaller.pop() ?? 0]?.push(j);
		atLeast.push(j);
		smaller.push(j);
	}
	const best = new Array<number>(n).fill(Infinity);
	best[0] = 0;
	for (let i = 0; i < n; i++) {
		for (const j of jumps[i] ?? [])
			best[j] = Math.min(best[j] ?? Infinity, (best[i] ?? 0) + (costs[j] ?? 0));
	}
	return best[n - 1] ?? 0;
};
