/**
 * 1356. Sort Integers by The Number of 1 Bits
 *
 * Sorts `arr` by how many 1 bits each value has, then by value.
 *
 * Counts bits once per value, then sorts.
 *
 * @see https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortIntegersByTheNumberOf1Bits([0, 1, 2, 3, 4, 5, 6, 7, 8]); // [0, 1, 2, 4, 8, 3, 5, 6, 7]
 */
export const sortIntegersByTheNumberOf1Bits = (
	arr: readonly number[],
): number[] => {
	const bits = (value: number) => {
		let count = 0;
		for (let rest = value; rest !== 0; rest &= rest - 1) count++;
		return count;
	};
	return arr
		.map((value) => [bits(value), value] as const)
		.sort((a, b) => a[0] - b[0] || a[1] - b[1])
		.map(([, value]) => value);
};
