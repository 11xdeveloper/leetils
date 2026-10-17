/**
 * 2039. The Time When the Network Becomes Idle
 *
 * Each data server sends a message to master server 0 at second 0; the
 * reply returns along a shortest path, one edge per second each way. A
 * server without its reply resends every `patience[i]` seconds. Returns
 * the first second at which no messages are travelling.
 *
 * Breadth-first search gives each server's round trip `2d`. Its last
 * resend is at the last multiple of its patience before `2d`, and that
 * reply arrives `2d` later.
 *
 * @see https://leetcode.com/problems/the-time-when-the-network-becomes-idle/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * theTimeWhenTheNetworkBecomesIdle([[0, 1], [1, 2]], [0, 2, 1]); // 8
 */
export const theTimeWhenTheNetworkBecomesIdle = (
	edges: readonly (readonly number[])[],
	patience: readonly number[],
): number => {
	const n = patience.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const distance = new Array<number>(n).fill(-1);
	distance[0] = 0;
	const queue = [0];
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head] ?? 0;
		for (const next of neighbours[node] ?? []) {
			if (distance[next] !== -1) continue;
			distance[next] = (distance[node] ?? 0) + 1;
			queue.push(next);
		}
	}
	let idle = 0;
	for (let server = 1; server < n; server++) {
		const roundTrip = 2 * (distance[server] ?? 0);
		const wait = patience[server] ?? 1;
		const lastSent = Math.floor((roundTrip - 1) / wait) * wait;
		idle = Math.max(idle, lastSent + roundTrip + 1);
	}
	return idle;
};
