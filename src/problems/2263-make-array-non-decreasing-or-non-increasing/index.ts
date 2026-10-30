import { Heap } from "../../internal/heap";

/**
 * 2263. Make Array Non-decreasing or Non-increasing
 *
 * An operation adds or subtracts 1 from an element. Returns the fewest
 * operations to make `nums` non-decreasing or non-increasing.
 *
 * Slope trick: for non-decreasing, keep a max-heap of the values so far.
 * When a value is below the heap's top, pay the gap and lower that top to
 * it. Run again on the negated array for non-increasing.
 *
 * @see https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeArrayNonDecreasingOrNonIncreasing([3, 2, 4, 5, 0]); // 4
 */
export const makeArrayNonDecreasingOrNonIncreasing = (
	nums: readonly number[],
): number => {
	const toNonDecreasing = (values: readonly number[]): number => {
		const heap = new Heap<number>((a, b) => b - a);
		let operations = 0;
		for (const value of values) {
			const top = heap.peek();
			if (top !== undefined && top > value) {
				operations += top - value;
				heap.pop();
				heap.push(value);
			}
			heap.push(value);
		}
		return operations;
	};
	return Math.min(
		toNonDecreasing(nums),
		toNonDecreasing(nums.map((num) => -num)),
	);
};
