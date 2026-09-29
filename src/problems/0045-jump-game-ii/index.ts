/**
 * 45. Jump Game II
 *
 * Starting at index 0, where each `nums[i]` is the furthest you can jump
 * forward from `i`, returns the fewest jumps needed to reach the last index.
 * The last index is always reachable.
 *
 * Breadth-first search without a queue: the indices reachable in `k` jumps
 * form a contiguous range, so it tracks where the current range ends and the
 * furthest index the next jump could reach.
 *
 * @see https://leetcode.com/problems/jump-game-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * jumpGameII([2, 3, 1, 1, 4]); // 2: jump to index 1, then to the end
 */
export const jumpGameII = (nums: readonly number[]): number => {
	let jumps = 0;
	let rangeEnd = 0;
	let furthest = 0;

	for (let i = 0; i < nums.length - 1; i++) {
		furthest = Math.max(furthest, i + (nums[i] ?? 0));
		if (i === rangeEnd) {
			jumps++;
			rangeEnd = furthest;
		}
	}

	return jumps;
};
