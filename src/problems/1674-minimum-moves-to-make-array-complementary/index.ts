/**
 * 1674. Minimum Moves to Make Array Complementary
 *
 * A move replaces an element of `nums` with any value in `1 … limit`.
 * Returns the fewest moves making every `nums[i] + nums[n − 1 − i]` equal.
 *
 * For a pair `(a, b)` with `a ≤ b`, a target sum costs 0 moves if it is
 * `a + b`, 1 if it is in `[a + 1, b + limit]`, and 2 otherwise. Record the
 * changes in a difference array over all targets and take the cheapest.
 *
 * @see https://leetcode.com/problems/minimum-moves-to-make-array-complementary/
 * @difficulty Medium
 * @timeComplexity O(n + limit)
 * @spaceComplexity O(limit)
 *
 * @example
 * minimumMovesToMakeArrayComplementary([1, 2, 4, 3], 4); // 1
 */
export const minimumMovesToMakeArrayComplementary = (
	nums: readonly number[],
	limit: number,
): number => {
	const n = nums.length;
	const delta = new Array<number>(2 * limit + 2).fill(0);
	const add = (index: number, change: number) => {
		delta[index] = (delta[index] ?? 0) + change;
	};
	for (let i = 0; i < n / 2; i++) {
		const [x, y] = [nums[i] ?? 0, nums[n - 1 - i] ?? 0];
		const [a, b] = [Math.min(x, y), Math.max(x, y)];
		add(2, 2);
		add(a + 1, -1);
		add(a + b, -1);
		add(a + b + 1, 1);
		add(b + limit + 1, 1);
	}
	let [best, moves] = [Infinity, 0];
	for (let target = 2; target <= 2 * limit; target++) {
		moves += delta[target] ?? 0;
		best = Math.min(best, moves);
	}
	return best;
};
