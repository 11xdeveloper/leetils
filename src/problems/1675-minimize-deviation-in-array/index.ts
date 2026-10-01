import { Heap } from "../../internal/heap";

/**
 * 1675. Minimize Deviation in Array
 *
 * Even elements may be halved and odd ones doubled, any number of times.
 * Returns the smallest possible difference between the largest and
 * smallest elements.
 *
 * Double every odd number first, so every value is at its largest and can
 * only shrink. Then repeatedly halve the current maximum while it is even,
 * tracking the minimum, and keep the best spread seen.
 *
 * @see https://leetcode.com/problems/minimize-deviation-in-array/
 * @difficulty Hard
 * @timeComplexity O(n log n log M) for the largest value M
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeDeviationInArray([4, 1, 5, 20, 3]); // 3
 */
export const minimizeDeviationInArray = (nums: readonly number[]): number => {
	const values = nums.map((num) => (num % 2 === 1 ? num * 2 : num));
	const heap = new Heap<number>((a, b) => b - a, values);
	let smallest = Math.min(...values);
	let best = Infinity;
	for (let largest = heap.pop() ?? 0; ; largest = heap.pop() ?? 0) {
		best = Math.min(best, largest - smallest);
		if (largest % 2 === 1) return best;
		smallest = Math.min(smallest, largest / 2);
		heap.push(largest / 2);
	}
};
