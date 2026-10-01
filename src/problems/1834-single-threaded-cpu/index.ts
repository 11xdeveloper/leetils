import { Heap } from "../../internal/heap";

/**
 * 1834. Single-Threaded CPU
 *
 * Tasks `[enqueueTime, processingTime]` arrive over time; whenever idle,
 * the CPU runs the available task with the shortest processing time (the
 * smallest index on ties). Returns the order tasks run in.
 *
 * Feed tasks into a min-heap in arrival order as time advances, jumping
 * ahead to the next arrival when nothing is waiting.
 *
 * @see https://leetcode.com/problems/single-threaded-cpu/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * singleThreadedCpu([[1, 2], [2, 4], [3, 2], [4, 1]]); // [0, 2, 3, 1]
 */
export const singleThreadedCpu = (
	tasks: readonly (readonly number[])[],
): number[] => {
	const arrivals = tasks
		.map((_, i) => i)
		.sort((a, b) => (tasks[a]?.[0] ?? 0) - (tasks[b]?.[0] ?? 0));
	const ready = new Heap<number>(
		(a, b) => (tasks[a]?.[1] ?? 0) - (tasks[b]?.[1] ?? 0) || a - b,
	);
	const order: number[] = [];
	let [time, next] = [0, 0];
	while (order.length < tasks.length) {
		if (ready.size === 0)
			time = Math.max(time, tasks[arrivals[next] ?? 0]?.[0] ?? 0);
		for (
			;
			next < arrivals.length && (tasks[arrivals[next] ?? 0]?.[0] ?? 0) <= time;
			next++
		)
			ready.push(arrivals[next] ?? 0);
		const task = ready.pop() ?? 0;
		order.push(task);
		time += tasks[task]?.[1] ?? 0;
	}
	return order;
};
