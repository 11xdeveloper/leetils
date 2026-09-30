/**
 * 1478. Allocate Mailboxes
 *
 * Places `k` mailboxes on a street to minimise the total distance from each
 * house to its nearest mailbox, and returns that total.
 *
 * Sorted, each mailbox serves a contiguous run of houses, and one mailbox
 * serves a run best at its median; `cost[i][j]` is that run's total. Then
 * `best[p][j]` is the cheapest way to serve the first `j` houses with `p`
 * mailboxes.
 *
 * @see https://leetcode.com/problems/allocate-mailboxes/
 * @difficulty Hard
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * allocateMailboxes([1, 4, 8, 10, 20], 3); // 5
 */
export const allocateMailboxes = (
	houses: readonly number[],
	k: number,
): number => {
	const sorted = houses.toSorted((a, b) => a - b);
	const n = sorted.length;
	// cost[i][j] serves sorted[i … j] from one mailbox at the median.
	const cost = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let i = n - 1; i >= 0; i--) {
		for (let j = i + 1; j < n; j++) {
			const row = cost[i];
			if (row)
				row[j] =
					(cost[i + 1]?.[j - 1] ?? 0) + (sorted[j] ?? 0) - (sorted[i] ?? 0);
		}
	}
	let best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (let boxes = 1; boxes <= k; boxes++) {
		const next = new Array<number>(n + 1).fill(Infinity);
		for (let end = 1; end <= n; end++) {
			for (let start = boxes - 1; start < end; start++) {
				next[end] = Math.min(
					next[end] ?? Infinity,
					(best[start] ?? Infinity) + (cost[start]?.[end - 1] ?? 0),
				);
			}
		}
		best = next;
	}
	return best[n] ?? 0;
};
