/**
 * 3224. Minimum Array Changes to Make Differences Equal
 *
 * Change elements of `nums` to values in [0, k] so every mirrored pair
 * `nums[i]`, `nums[n - 1 - i]` differs by the same amount. Returns the
 * fewest changes.
 *
 * For a pair a ≤ b, difference b - a costs nothing, any difference up to
 * max(b, k - a) costs one change, and larger ones cost two. Add each pair's
 * costs over all differences with a difference array.
 *
 * @see https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(k)
 *
 * @example
 * minimumArrayChangesToMakeDifferencesEqual([1, 0, 1, 2, 4, 3], 4); // 2
 */
export const minimumArrayChangesToMakeDifferencesEqual = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const changes = new Int32Array(k + 2);
	const add = (from: number, to: number, cost: number): void => {
		changes[from] = (changes[from] ?? 0) + cost;
		changes[to + 1] = (changes[to + 1] ?? 0) - cost;
	};
	for (let i = 0; i < n / 2; i++) {
		const a = Math.min(nums[i] ?? 0, nums[n - 1 - i] ?? 0);
		const b = Math.max(nums[i] ?? 0, nums[n - 1 - i] ?? 0);
		const reach = Math.max(b, k - a);
		add(0, k, 1);
		add(b - a, b - a, -1);
		add(reach + 1, k, 1);
	}
	let best = Number.POSITIVE_INFINITY;
	for (let x = 0, running = 0; x <= k; x++) {
		running += changes[x] ?? 0;
		best = Math.min(best, running);
	}
	return best;
};
