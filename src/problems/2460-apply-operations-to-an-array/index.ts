/**
 * 2460. Apply Operations to an Array
 *
 * In order, wherever `nums[i] === nums[i + 1]`, doubles `nums[i]` and
 * zeroes `nums[i + 1]`; then moves the zeros to the end.
 *
 * @see https://leetcode.com/problems/apply-operations-to-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * applyOperationsToAnArray([1, 2, 2, 1, 1, 0]); // [1, 4, 2, 0, 0, 0]
 */
export const applyOperationsToAnArray = (nums: readonly number[]): number[] => {
	const values = [...nums];
	for (let i = 0; i + 1 < values.length; i++) {
		if (values[i] !== values[i + 1]) continue;
		values[i] = (values[i] ?? 0) * 2;
		values[i + 1] = 0;
	}
	const nonZero = values.filter((v) => v !== 0);
	return [
		...nonZero,
		...new Array<number>(values.length - nonZero.length).fill(0),
	];
};
