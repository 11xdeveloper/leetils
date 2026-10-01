import { Heap } from "../../internal/heap";

/**
 * 1882. Process Tasks Using Servers
 *
 * Task `j` arrives at second `j` and needs `tasks[j]` seconds. Each goes,
 * in order, to the free server of least weight (then least index), waiting
 * for the earliest server to free up if none is. Returns each task's
 * server.
 *
 * A heap of free servers by (weight, index) and a heap of busy servers by
 * free time. A task starts at the later of its arrival and the previous
 * task's start, or when a server frees up if none is free.
 *
 * @see https://leetcode.com/problems/process-tasks-using-servers/
 * @difficulty Medium
 * @timeComplexity O((n + m) log n)
 * @spaceComplexity O(n + m)
 *
 * @example
 * processTasksUsingServers([3, 3, 2], [1, 2, 3, 2, 1, 2]); // [2, 2, 0, 2, 1, 2]
 */
export const processTasksUsingServers = (
	servers: readonly number[],
	tasks: readonly number[],
): number[] => {
	const byWeight = (a: number, b: number) =>
		(servers[a] ?? 0) - (servers[b] ?? 0) || a - b;
	const free = new Heap<number>(byWeight, servers.keys());
	const busy = new Heap<[freeAt: number, server: number]>(
		(a, b) => a[0] - b[0] || byWeight(a[1], b[1]),
	);
	// Tasks are assigned in order, so none starts before the previous one did.
	let time = 0;
	return tasks.map((duration, arrival) => {
		time = Math.max(time, arrival);
		if (free.size === 0) time = Math.max(time, busy.peek()?.[0] ?? time);
		while ((busy.peek()?.[0] ?? Infinity) <= time)
			free.push(busy.pop()?.[1] ?? 0);
		const server = free.pop() ?? 0;
		busy.push([time + duration, server]);
		return server;
	});
};
