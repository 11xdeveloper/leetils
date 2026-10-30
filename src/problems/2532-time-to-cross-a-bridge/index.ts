import { Heap } from "../../internal/heap";

/**
 * 2532. Time to Cross a Bridge
 *
 * `k` workers move `n` boxes from an old warehouse on the right bank to a
 * new one on the left, over a bridge one worker can use at a time. Worker
 * `i` takes `time[i] = [right, pick, left, put]` minutes to cross to the
 * right, pick up a box, cross back and put it down. When the bridge is
 * free, a worker waiting on the right goes first; otherwise one waiting
 * on the left crosses if boxes still need fetching. Among those waiting,
 * the least efficient goes first: the one whose crossings take longest,
 * then the higher index. Returns when the last box reaches the left bank.
 *
 * Simulate with four heaps: workers waiting on each bank, ordered by
 * efficiency, and workers busy picking or putting, ordered by when they
 * finish.
 *
 * @see https://leetcode.com/problems/time-to-cross-a-bridge/
 * @difficulty Hard
 * @timeComplexity O((n + k) log k)
 * @spaceComplexity O(k)
 *
 * @example
 * timeToCrossABridge(1, 3, [[1, 1, 2, 1], [1, 1, 3, 1], [1, 1, 4, 1]]); // 6
 */
export const timeToCrossABridge = (
	n: number,
	k: number,
	time: readonly (readonly number[])[],
): number => {
	const crossing = (i: number): number =>
		(time[i]?.[0] ?? 0) + (time[i]?.[2] ?? 0);
	const leastEfficientFirst = (a: number, b: number): number =>
		crossing(b) - crossing(a) || b - a;
	const leftWaiting = new Heap<number>(leastEfficientFirst, [
		...Array(k).keys(),
	]);
	const rightWaiting = new Heap<number>(leastEfficientFirst);
	const putting = new Heap<[done: number, worker: number]>(
		(a, b) => a[0] - b[0],
	);
	const picking = new Heap<[done: number, worker: number]>(
		(a, b) => a[0] - b[0],
	);

	let now = 0;
	let toFetch = n;
	while (toFetch > 0 || rightWaiting.size > 0 || picking.size > 0) {
		for (let top = putting.peek(); top && top[0] <= now; top = putting.peek())
			leftWaiting.push(putting.pop()?.[1] ?? 0);
		for (let top = picking.peek(); top && top[0] <= now; top = picking.peek())
			rightWaiting.push(picking.pop()?.[1] ?? 0);

		const fromRight = rightWaiting.pop();
		if (fromRight !== undefined) {
			now += time[fromRight]?.[2] ?? 0;
			putting.push([now + (time[fromRight]?.[3] ?? 0), fromRight]);
			continue;
		}
		const fromLeft = toFetch > 0 ? leftWaiting.pop() : undefined;
		if (fromLeft !== undefined) {
			toFetch--;
			now += time[fromLeft]?.[0] ?? 0;
			picking.push([now + (time[fromLeft]?.[1] ?? 0), fromLeft]);
			continue;
		}
		// Nobody can cross yet: wait for the next worker to finish.
		now = Math.min(
			picking.peek()?.[0] ?? Number.POSITIVE_INFINITY,
			toFetch > 0
				? (putting.peek()?.[0] ?? Number.POSITIVE_INFINITY)
				: Number.POSITIVE_INFINITY,
		);
	}
	return now;
};
