/**
 * 1471. The k Strongest Values in an Array
 *
 * With `m` the median (the element at `⌊(n − 1) / 2⌋` once sorted), a value
 * is stronger the further it is from `m`, and larger values win ties.
 * Returns the `k` strongest values, in any order.
 *
 * After sorting, the strongest remaining value is always at one of the two
 * ends, so two pointers take them in order.
 *
 * @see https://leetcode.com/problems/the-k-strongest-values-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * theKStrongestValuesInAnArray([1, 2, 3, 4, 5], 2); // [5, 1]
 */
export const theKStrongestValuesInAnArray = (
	arr: readonly number[],
	k: number,
): number[] => {
	const sorted = arr.toSorted((a, b) => a - b);
	const median = sorted[Math.floor((sorted.length - 1) / 2)] ?? 0;
	const strongest: number[] = [];
	let [low, high] = [0, sorted.length - 1];
	while (strongest.length < k) {
		const [a = 0, b = 0] = [sorted[low], sorted[high]];
		if (Math.abs(b - median) >= Math.abs(a - median)) {
			strongest.push(b);
			high--;
		} else {
			strongest.push(a);
			low++;
		}
	}
	return strongest;
};
