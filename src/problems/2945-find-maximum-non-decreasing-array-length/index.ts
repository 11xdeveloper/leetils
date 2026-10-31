/**
 * 2945. Find Maximum Non-decreasing Array Length
 *
 * An operation replaces a subarray with its sum. Returns the longest
 * non-decreasing array reachable.
 *
 * Cut `nums` into pieces with non-decreasing sums, as many as possible.
 * For each prefix, the best split ends with the smallest last piece
 * allowed, starting at the latest cut `j` with `prefix[j] + last[j] <=
 * prefix[i]`. Those keys only grow in usefulness, so a monotonic queue
 * finds `j`.
 *
 * @see https://leetcode.com/problems/find-maximum-non-decreasing-array-length/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findMaximumNonDecreasingArrayLength([4, 3, 2, 6]); // 3
 */
export const findMaximumNonDecreasingArrayLength = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);
	const pieces = Array.from({ length: n + 1 }, () => 0);
	const last = Array.from({ length: n + 1 }, () => 0);
	const key = (j: number): number => (prefix[j] ?? 0) + (last[j] ?? 0);
	const queue = [0];
	let head = 0;
	for (let i = 1; i <= n; i++) {
		const here = prefix[i] ?? 0;
		while (head + 1 < queue.length && key(queue[head + 1] ?? 0) <= here) head++;
		const j = queue[head] ?? 0;
		pieces[i] = (pieces[j] ?? 0) + 1;
		last[i] = here - (prefix[j] ?? 0);
		while (queue.length > head && key(queue.at(-1) ?? 0) >= key(i)) queue.pop();
		queue.push(i);
	}
	return pieces[n] ?? 0;
};
