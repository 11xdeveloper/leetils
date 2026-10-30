/**
 * 2612. Minimum Reverse Operations
 *
 * An array of length `n` is all zeros except a 1 at `p`. An operation
 * reverses a length-`k` subarray, provided the 1 doesn't land on a banned
 * index. Returns the fewest operations to bring the 1 to each index, or
 * -1 where it can't get.
 *
 * Breadth-first search. From `i`, reversing the window starting at `l`
 * sends the 1 to `2l + k - 1 - i`, so the reachable targets form a range
 * of a single parity. Keep the unvisited indices of each parity in a
 * "next unvisited" union–find so each is dequeued once.
 *
 * @see https://leetcode.com/problems/minimum-reverse-operations/
 * @difficulty Hard
 * @timeComplexity O(n α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * minimumReverseOperations(4, 0, [1, 2], 4); // [0, -1, -1, 1]
 */
export const minimumReverseOperations = (
	n: number,
	p: number,
	banned: readonly number[],
	k: number,
): number[] => {
	const answer = Array.from({ length: n }, () => -1);
	answer[p] = 0;
	// nextFree[i]: the smallest unvisited index ≥ i of the same parity, or ≥ n.
	const nextFree = Array.from({ length: n + 2 }, (_, i) => i);
	const take = (i: number): void => {
		nextFree[i] = i + 2;
	};
	const find = (i: number): number => {
		let root = i;
		while (root < n && nextFree[root] !== root) root = nextFree[root] ?? n;
		for (let j = i; j < n && nextFree[j] !== j; ) {
			const up = nextFree[j] ?? n;
			nextFree[j] = root;
			j = up;
		}
		return root;
	};
	take(p);
	for (const b of banned) take(b);

	const queue = [p];
	for (let head = 0; head < queue.length; head++) {
		const i = queue[head] ?? 0;
		const low = 2 * Math.max(0, i - k + 1) + k - 1 - i;
		const high = 2 * Math.min(i, n - k) + k - 1 - i;
		for (let j = find(low); j <= high; j = find(j)) {
			answer[j] = (answer[i] ?? 0) + 1;
			take(j);
			queue.push(j);
		}
	}
	return answer;
};
