import { Heap } from "../../internal/heap";

/**
 * 1046. Last Stone Weight
 *
 * Repeatedly smashes the two heaviest stones: equal stones both vanish,
 * otherwise the lighter vanishes and the heavier loses its weight. Returns
 * the last stone's weight, or 0 if none remain.
 *
 * A max-heap gives the two heaviest each round.
 *
 * @see https://leetcode.com/problems/last-stone-weight/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * lastStoneWeight([2, 7, 4, 1, 8, 1]); // 1
 */
export const lastStoneWeight = (stones: readonly number[]): number => {
	const heap = new Heap<number>((a, b) => b - a, stones);
	while (heap.size > 1) {
		const heaviest = heap.pop() ?? 0;
		const next = heap.pop() ?? 0;
		if (heaviest !== next) heap.push(heaviest - next);
	}
	return heap.peek() ?? 0;
};
