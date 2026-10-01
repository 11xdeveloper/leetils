import { Heap } from "../../internal/heap";

/**
 * 1167. Minimum Cost to Connect Sticks
 *
 * Joining sticks of lengths `x` and `y` costs `x + y` and leaves one stick
 * of that length. Returns the cheapest way to join all the sticks into one.
 *
 * Huffman's algorithm: always join the two shortest sticks, using a
 * min-heap.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-connect-sticks/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToConnectSticks([1, 8, 3, 5]); // 30
 */
export const minimumCostToConnectSticks = (
	sticks: readonly number[],
): number => {
	const heap = new Heap<number>((a, b) => a - b, sticks);
	let cost = 0;
	while (heap.size > 1) {
		const joined = (heap.pop() ?? 0) + (heap.pop() ?? 0);
		cost += joined;
		heap.push(joined);
	}
	return cost;
};
