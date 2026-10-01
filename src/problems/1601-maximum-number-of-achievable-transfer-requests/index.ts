/**
 * 1601. Maximum Number of Achievable Transfer Requests
 *
 * `requests[i] = [from, to]` asks to move one employee. A set of requests
 * can be granted if every building's moves in and out balance. Returns the
 * most requests that can be granted together.
 *
 * With at most 16 requests, try every subset (largest first by size) and
 * check the balances.
 *
 * @see https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests/
 * @difficulty Hard
 * @timeComplexity O(2^r · (r + n)) for r requests
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfAchievableTransferRequests(3, [[0, 0], [1, 2], [2, 1]]); // 3
 */
export const maximumNumberOfAchievableTransferRequests = (
	n: number,
	requests: readonly (readonly number[])[],
): number => {
	let best = 0;
	const balance = new Int32Array(n);
	for (let mask = 1; mask < 2 ** requests.length; mask++) {
		let size = 0;
		for (let rest = mask; rest !== 0; rest &= rest - 1) size++;
		if (size <= best) continue;
		balance.fill(0);
		requests.forEach(([from = 0, to = 0], i) => {
			if (!(mask & (1 << i))) return;
			balance[from] = (balance[from] ?? 0) - 1;
			balance[to] = (balance[to] ?? 0) + 1;
		});
		if (balance.every((change) => change === 0)) best = size;
	}
	return best;
};
