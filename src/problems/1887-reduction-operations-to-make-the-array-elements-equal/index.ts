/**
 * 1887. Reduction Operations to Make the Array Elements Equal
 *
 * Each operation lowers one copy of the largest value to the next largest
 * distinct value. Returns how many operations make all elements equal.
 *
 * Sorted, each element is lowered once per distinct value below it.
 *
 * @see https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * reductionOperationsToMakeTheArrayElementsEqual([1, 1, 2, 2, 3]); // 4
 */
export const reductionOperationsToMakeTheArrayElementsEqual = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let [operations, level] = [0, 0];
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i] !== sorted[i - 1]) level++;
		operations += level;
	}
	return operations;
};
