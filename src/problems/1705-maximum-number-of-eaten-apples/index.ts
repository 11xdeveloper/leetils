import { Heap } from "../../internal/heap";

/**
 * 1705. Maximum Number of Eaten Apples
 *
 * On day `i` a tree grows `apples[i]` apples that rot on day
 * `i + days[i]`. Eating at most one apple a day (and continuing after the
 * last day), returns the most apples eaten.
 *
 * Each day eat the apple that rots soonest, keeping batches in a min-heap
 * by rot day and discarding rotten ones.
 *
 * @see https://leetcode.com/problems/maximum-number-of-eaten-apples/
 * @difficulty Medium
 * @timeComplexity O((n + D) log n) for the last rot day D
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfEatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2]); // 7
 */
export const maximumNumberOfEatenApples = (
	apples: readonly number[],
	days: readonly number[],
): number => {
	const batches = new Heap<[rotsOn: number, count: number]>(
		(a, b) => a[0] - b[0],
	);
	let eaten = 0;
	for (let day = 0; day < apples.length || batches.size > 0; day++) {
		const grown = apples[day] ?? 0;
		if (grown > 0) batches.push([day + (days[day] ?? 0), grown]);
		while ((batches.peek()?.[0] ?? Infinity) <= day) batches.pop();
		const batch = batches.pop();
		if (!batch) continue;
		eaten++;
		if (batch[1] > 1) batches.push([batch[0], batch[1] - 1]);
	}
	return eaten;
};
