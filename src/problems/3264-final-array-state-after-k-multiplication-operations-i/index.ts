/**
 * 3264. Final Array State After K Multiplication Operations I
 *
 * `k` times, multiply the smallest element of `nums` (the first, on a tie)
 * by `multiplier`. Returns the final array.
 *
 * Simulate, scanning for the minimum each time.
 *
 * @see https://leetcode.com/problems/final-array-state-after-k-multiplication-operations-i/
 * @difficulty Easy
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n)
 *
 * @example
 * finalArrayStateAfterKMultiplicationOperationsI([2, 1, 3, 5, 6], 5, 2); // [8, 4, 6, 5, 6]
 */
export const finalArrayStateAfterKMultiplicationOperationsI = (
	nums: readonly number[],
	k: number,
	multiplier: number,
): number[] => {
	const result = [...nums];
	for (let step = 0; step < k; step++) {
		let smallest = 0;
		for (let i = 1; i < result.length; i++)
			if ((result[i] ?? 0) < (result[smallest] ?? 0)) smallest = i;
		result[smallest] = (result[smallest] ?? 0) * multiplier;
	}
	return result;
};
