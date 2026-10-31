/**
 * 3769. Sort Integers by Binary Reflection
 *
 * A number's reflection reverses its binary digits. Sorts `nums` by
 * reflection, breaking ties by the numbers themselves.
 *
 * @see https://leetcode.com/problems/sort-integers-by-binary-reflection/
 * @difficulty Easy
 * @timeComplexity O(n log n · log V)
 * @spaceComplexity O(n)
 *
 * @example
 * sortIntegersByBinaryReflection([3, 6, 5, 8]); // [8, 3, 6, 5]
 */
export const sortIntegersByBinaryReflection = (
	nums: readonly number[],
): number[] => {
	const reflect = (x: number) =>
		Number.parseInt([...x.toString(2)].reverse().join(""), 2);
	return [...nums].sort((a, b) => reflect(a) - reflect(b) || a - b);
};
