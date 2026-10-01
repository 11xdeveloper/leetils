import { Heap } from "../../internal/heap";

/**
 * 1962. Remove Stones to Minimize the Total
 *
 * `k` times, removes `⌊pile / 2⌋` stones from some pile. Returns the least
 * total left.
 *
 * Always halve the largest pile, using a max-heap.
 *
 * @see https://leetcode.com/problems/remove-stones-to-minimize-the-total/
 * @difficulty Medium
 * @timeComplexity O(n + k log n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeStonesToMinimizeTheTotal([5, 4, 9], 2); // 12
 */
export const removeStonesToMinimizeTheTotal = (
	piles: readonly number[],
	k: number,
): number => {
	const heap = new Heap<number>((a, b) => b - a, piles);
	let total = piles.reduce((sum, pile) => sum + pile, 0);
	for (let step = 0; step < k; step++) {
		const pile = heap.pop() ?? 0;
		const removed = Math.floor(pile / 2);
		total -= removed;
		heap.push(pile - removed);
	}
	return total;
};
