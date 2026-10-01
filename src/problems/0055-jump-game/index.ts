/**
 * 55. Jump Game
 *
 * Starting at index 0, where each `nums[i]` is the furthest you can jump
 * forward from `i`, returns whether the last index can be reached.
 *
 * Tracks the furthest index reachable so far. If the scan ever passes it,
 * everything beyond is unreachable.
 *
 * @see https://leetcode.com/problems/jump-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * jumpGame([2, 3, 1, 1, 4]); // true
 * jumpGame([3, 2, 1, 0, 4]); // false
 */
export const jumpGame = (nums: readonly number[]): boolean => {
	let furthest = 0;

	for (const [i, jump] of nums.entries()) {
		if (i > furthest) return false;
		furthest = Math.max(furthest, i + jump);
	}

	return true;
};
