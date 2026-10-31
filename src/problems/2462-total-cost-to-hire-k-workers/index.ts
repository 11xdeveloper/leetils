import { Heap } from "../../internal/heap";

/**
 * 2462. Total Cost to Hire K Workers
 *
 * Each of `k` rounds hires the cheapest worker (lowest index on ties)
 * among the first and last `candidates` workers still available. Returns
 * the total cost.
 *
 * Keep one heap per end, refilling from the untouched middle.
 *
 * @see https://leetcode.com/problems/total-cost-to-hire-k-workers/
 * @difficulty Medium
 * @timeComplexity O((k + candidates) log candidates)
 * @spaceComplexity O(candidates)
 *
 * @example
 * totalCostToHireKWorkers([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4); // 11
 */
export const totalCostToHireKWorkers = (
	costs: readonly number[],
	k: number,
	candidates: number,
): number => {
	const byCost = (a: number, b: number): number =>
		(costs[a] ?? 0) - (costs[b] ?? 0) || a - b;
	const front = new Heap<number>(byCost);
	const back = new Heap<number>(byCost);
	let [next, last] = [0, costs.length - 1];
	for (let i = 0; i < candidates && next <= last; i++) front.push(next++);
	for (let i = 0; i < candidates && next <= last; i++) back.push(last--);
	let total = 0;
	for (let round = 0; round < k; round++) {
		const [a, b] = [front.peek(), back.peek()];
		const fromFront = b === undefined || (a !== undefined && byCost(a, b) <= 0);
		const heap = fromFront ? front : back;
		total += costs[heap.pop() ?? 0] ?? 0;
		if (next <= last) heap.push(fromFront ? next++ : last--);
	}
	return total;
};
