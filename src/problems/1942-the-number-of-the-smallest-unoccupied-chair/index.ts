import { Heap } from "../../internal/heap";

/**
 * 1942. The Number of the Smallest Unoccupied Chair
 *
 * Friends arrive and leave at `times[i] = [arrival, leaving]` (distinct
 * arrivals), each taking the lowest-numbered free chair. Returns the chair
 * of `targetFriend`.
 *
 * Process arrivals in time order, first freeing the chairs of everyone who
 * has left (a min-heap by leaving time) into a min-heap of free chairs.
 *
 * @see https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * theNumberOfTheSmallestUnoccupiedChair([[3, 10], [1, 5], [2, 6]], 0); // 2
 */
export const theNumberOfTheSmallestUnoccupiedChair = (
	times: readonly (readonly number[])[],
	targetFriend: number,
): number => {
	const order = times
		.map((_, i) => i)
		.sort((a, b) => (times[a]?.[0] ?? 0) - (times[b]?.[0] ?? 0));
	const free = new Heap<number>((a, b) => a - b);
	const seated = new Heap<[leaving: number, chair: number]>(
		(a, b) => a[0] - b[0],
	);
	let nextChair = 0;
	for (const friend of order) {
		const [arrival = 0, leaving = 0] = times[friend] ?? [];
		while ((seated.peek()?.[0] ?? Infinity) <= arrival)
			free.push(seated.pop()?.[1] ?? 0);
		let chair = free.pop();
		if (chair === undefined) {
			chair = nextChair;
			nextChair++;
		}
		if (friend === targetFriend) return chair;
		seated.push([leaving, chair]);
	}
	return -1;
};
