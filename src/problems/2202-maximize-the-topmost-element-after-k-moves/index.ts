/**
 * 2202. Maximize the Topmost Element After K Moves
 *
 * A move pops the top of the pile `nums` (top first) or pushes back a
 * popped element. Returns the largest possible top after exactly `k`
 * moves, or -1 if the pile must be empty.
 *
 * Either pop `k` times, exposing `nums[k]`, or pop `k - 1` and push back
 * the largest of those. A single element alternates, so only an even `k`
 * leaves it on top.
 *
 * @see https://leetcode.com/problems/maximize-the-topmost-element-after-k-moves/
 * @difficulty Medium
 * @timeComplexity O(min(n, k))
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeTheTopmostElementAfterKMoves([5, 2, 2, 4, 0, 6], 4); // 5
 */
export const maximizeTheTopmostElementAfterKMoves = (
	nums: readonly number[],
	k: number,
): number => {
	if (nums.length === 1) return k % 2 ? -1 : (nums[0] ?? -1);
	let best = nums[k] ?? -1;
	for (let i = 0; i < Math.min(k - 1, nums.length); i++)
		best = Math.max(best, nums[i] ?? -1);
	return best;
};
