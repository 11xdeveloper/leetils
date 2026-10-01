/**
 * 1696. Jump Game VI
 *
 * Starting at index 0, each jump moves forward 1 to `k` places. Returns
 * the largest sum of the visited elements on reaching the last index.
 *
 * `best[i]` is `nums[i]` plus the largest `best` among the previous `k`
 * indices, kept in a monotonic deque.
 *
 * @see https://leetcode.com/problems/jump-game-vi/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * jumpGameVI([1, -1, -2, 4, -7, 3], 2); // 7
 */
export const jumpGameVI = (nums: readonly number[], k: number): number => {
	const best = [nums[0] ?? 0];
	const window = [0];
	let head = 0;
	for (let i = 1; i < nums.length; i++) {
		if ((window[head] ?? 0) < i - k) head++;
		best.push((nums[i] ?? 0) + (best[window[head] ?? 0] ?? 0));
		while (
			window.length > head &&
			(best[window.at(-1) ?? 0] ?? 0) <= (best[i] ?? 0)
		)
			window.pop();
		window.push(i);
	}
	return best.at(-1) ?? 0;
};
