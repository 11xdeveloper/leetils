/**
 * 3507. Minimum Pair Removal to Sort Array I
 *
 * Repeatedly replace the neighbouring pair with the smallest sum (the
 * leftmost on a tie) by its sum. Returns how many replacements it takes for
 * `nums` to be non-decreasing.
 *
 * Simulate.
 *
 * @see https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumPairRemovalToSortArrayI([5, 2, 3, 1]); // 2
 */
export const minimumPairRemovalToSortArrayI = (
	nums: readonly number[],
): number => {
	const values = [...nums];
	let operations = 0;
	while (values.some((v, i) => i > 0 && v < (values[i - 1] ?? 0))) {
		let at = 0;
		for (let i = 1; i + 1 < values.length; i++)
			if (
				(values[i] ?? 0) + (values[i + 1] ?? 0) <
				(values[at] ?? 0) + (values[at + 1] ?? 0)
			)
				at = i;
		values.splice(at, 2, (values[at] ?? 0) + (values[at + 1] ?? 0));
		operations++;
	}
	return operations;
};
