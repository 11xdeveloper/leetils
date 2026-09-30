import { Heap } from "../../internal/heap";

/**
 * 1354. Construct Target Array With Multiple Sums
 *
 * Starting from all 1s, a step replaces one element with the sum of the
 * array. Returns whether `target` can be reached.
 *
 * Works backwards: the largest element was the last one set, to the sum of
 * the others plus its old value. So its old value is the largest minus the
 * rest. Repeated steps on the same element are taken all at once with a
 * modulo, which keeps huge, lopsided targets fast.
 *
 * @see https://leetcode.com/problems/construct-target-array-with-multiple-sums/
 * @difficulty Hard
 * @timeComplexity O(n log n · log(max))
 * @spaceComplexity O(n)
 *
 * @example
 * constructTargetArrayWithMultipleSums([9, 3, 5]); // true
 */
export const constructTargetArrayWithMultipleSums = (
	target: readonly number[],
): boolean => {
	const heap = new Heap<number>((a, b) => b - a, target);
	let total = target.reduce((sum, value) => sum + value, 0);
	for (
		let largest = heap.peek() ?? 1;
		largest > 1;
		largest = heap.peek() ?? 1
	) {
		const rest = total - largest;
		if (rest === 1) return true;
		if (rest === 0 || rest >= largest) return false;
		const previous = largest % rest;
		if (previous === 0) return false;
		heap.pop();
		heap.push(previous);
		total = rest + previous;
	}
	return true;
};
