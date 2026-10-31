import { Heap } from "../../internal/heap";

/**
 * 2163. Minimum Difference in Sums After Removal of Elements
 *
 * Removes `n` of the `3n` numbers, then splits the rest into its first
 * `n` and last `n`. Returns the smallest possible first sum minus second
 * sum.
 *
 * For each split point between `n` and `2n`, the first part is the `n`
 * smallest before it and the second the `n` largest after it. Heaps give
 * those sums for every split in one pass each way.
 *
 * @see https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDifferenceInSumsAfterRemovalOfElements([7, 9, 5, 8, 1, 3]); // 1
 */
export const minimumDifferenceInSumsAfterRemovalOfElements = (
	nums: readonly number[],
): number => {
	const n = nums.length / 3;
	/** The sum of the `n` best of nums[0..i) by `first`, for i from n to 2n. */
	const bestSums = (
		values: readonly number[],
		first: (a: number, b: number) => number,
	): number[] => {
		const heap = new Heap<number>((a, b) => -first(a, b));
		let sum = 0;
		const sums: number[] = [];
		for (const [i, value] of values.slice(0, 2 * n).entries()) {
			heap.push(value);
			sum += value;
			if (heap.size > n) sum -= heap.pop() ?? 0;
			if (i >= n - 1) sums.push(sum);
		}
		return sums;
	};
	const smallest = bestSums(nums, (a, b) => a - b);
	const largest = bestSums(nums.toReversed(), (a, b) => b - a).reverse();
	return Math.min(...smallest.map((sum, i) => sum - (largest[i] ?? 0)));
};
