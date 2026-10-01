import { Heap } from "../../internal/heap";

/**
 * 1606. Find Servers That Handled Most Number of Requests
 *
 * Request `i` goes to server `i mod k` if it's free, else the next free
 * server after it (wrapping round), else it's dropped. Returns the servers
 * that handled the most requests.
 *
 * A min-heap of busy servers by finish time frees servers as requests
 * arrive. A segment tree over the servers marks which are free and finds
 * the first free one at or after a position.
 *
 * @see https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/
 * @difficulty Hard
 * @timeComplexity O(n log n + n log k)
 * @spaceComplexity O(n + k)
 *
 * @example
 * findServersThatHandledMostNumberOfRequests(3, [1, 2, 3, 4, 5], [5, 2, 3, 3, 3]); // [1]
 */
export const findServersThatHandledMostNumberOfRequests = (
	k: number,
	arrival: readonly number[],
	load: readonly number[],
): number[] => {
	let size = 1;
	while (size < k) size *= 2;
	// free[node] counts free servers in the node's range.
	const free = new Int32Array(2 * size);
	const set = (server: number, value: number) => {
		let node = size + server;
		free[node] = value;
		for (node >>= 1; node > 0; node >>= 1)
			free[node] = (free[2 * node] ?? 0) + (free[2 * node + 1] ?? 0);
	};
	for (let server = 0; server < k; server++) set(server, 1);
	/** The first free server at or after `from`, or -1. */
	const firstFree = (
		from: number,
		node = 1,
		low = 0,
		high = size - 1,
	): number => {
		if (high < from || (free[node] ?? 0) === 0) return -1;
		if (low === high) return low;
		const mid = (low + high) >> 1;
		const left = firstFree(from, 2 * node, low, mid);
		return left !== -1 ? left : firstFree(from, 2 * node + 1, mid + 1, high);
	};
	const busy = new Heap<[number, number]>((a, b) => a[0] - b[0]);
	const handled = new Array<number>(k).fill(0);
	arrival.forEach((time, i) => {
		for (let top = busy.peek(); top && top[0] <= time; top = busy.peek()) {
			busy.pop();
			set(top[1], 1);
		}
		let server = firstFree(i % k);
		if (server === -1) server = firstFree(0);
		if (server === -1) return;
		set(server, 0);
		busy.push([time + (load[i] ?? 0), server]);
		handled[server] = (handled[server] ?? 0) + 1;
	});
	const most = Math.max(...handled);
	return handled.flatMap((count, server) => (count === most ? [server] : []));
};
