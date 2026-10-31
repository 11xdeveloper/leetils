/**
 * 2747. Count Zero Request Servers
 *
 * `logs[i] = [server, time]` records a request. For each query `q`,
 * returns how many of the `n` servers got no request during `[q - x, q]`.
 *
 * Answer queries in time order with a sliding window over the sorted
 * logs, counting requests per server inside it.
 *
 * @see https://leetcode.com/problems/count-zero-request-servers/
 * @difficulty Medium
 * @timeComplexity O(L log L + Q log Q)
 * @spaceComplexity O(n + L + Q)
 *
 * @example
 * countZeroRequestServers(3, [[1, 3], [2, 6], [1, 5]], 5, [10, 11]); // [1, 2]
 */
export const countZeroRequestServers = (
	n: number,
	logs: readonly (readonly number[])[],
	x: number,
	queries: readonly number[],
): number[] => {
	const sorted = logs.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	const order = queries
		.map((_, i) => i)
		.sort((a, b) => (queries[a] ?? 0) - (queries[b] ?? 0));
	const requests = Array.from({ length: n + 1 }, () => 0);
	const answer = queries.map(() => 0);
	let active = 0;
	let left = 0;
	let right = 0;
	for (const q of order) {
		const end = queries[q] ?? 0;
		for (; right < sorted.length && (sorted[right]?.[1] ?? 0) <= end; right++) {
			const server = sorted[right]?.[0] ?? 0;
			requests[server] = (requests[server] ?? 0) + 1;
			if (requests[server] === 1) active++;
		}
		for (; left < right && (sorted[left]?.[1] ?? 0) < end - x; left++) {
			const server = sorted[left]?.[0] ?? 0;
			requests[server] = (requests[server] ?? 0) - 1;
			if (requests[server] === 0) active--;
		}
		answer[q] = n - active;
	}
	return answer;
};
