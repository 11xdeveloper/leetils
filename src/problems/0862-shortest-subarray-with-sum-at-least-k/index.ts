/**
 * 862. Shortest Subarray with Sum at Least K
 *
 * Returns the length of the shortest non-empty subarray of `nums` (which
 * may hold negatives) summing to at least `k`, or -1 if there's none.
 *
 * With prefix sums, it looks for the closest earlier prefix at least `k`
 * smaller. A deque holds candidate starts with increasing prefix sums:
 * starts that have been used are dropped from the front (a later end can't
 * do better with them), and any start whose prefix isn't smaller than a
 * later one is dropped from the back.
 *
 * @see https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestSubarrayWithSumAtLeastK([2, -1, 2], 3); // 3
 */
export const shortestSubarrayWithSumAtLeastK = (
	nums: readonly number[],
	k: number,
): number => {
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);

	const starts = new Array<number>(prefix.length);
	let head = 0;
	let tail = 0;
	let shortest = Number.POSITIVE_INFINITY;
	for (const [end, sum] of prefix.entries()) {
		while (head < tail && sum - (prefix[starts[head] ?? 0] ?? 0) >= k)
			shortest = Math.min(shortest, end - (starts[head++] ?? 0));
		while (head < tail && (prefix[starts[tail - 1] ?? 0] ?? 0) >= sum) tail--;
		starts[tail++] = end;
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : shortest;
};
