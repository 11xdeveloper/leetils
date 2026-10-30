/**
 * 2966. Divide Array Into Arrays With Max Difference
 *
 * Splits `nums`, whose length is a multiple of 3, into groups of three
 * whose elements differ by at most `k`. Returns the groups, or `[]` if
 * that's impossible.
 *
 * Sort and take consecutive triples; if any of those fails, every split
 * does.
 *
 * @see https://leetcode.com/problems/divide-array-into-arrays-with-max-difference/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * divideArrayIntoArraysWithMaxDifference([1, 3, 4, 8, 7, 9, 3, 5, 1], 2); // [[1, 1, 3], [3, 4, 5], [7, 8, 9]]
 */
export const divideArrayIntoArraysWithMaxDifference = (
	nums: readonly number[],
	k: number,
): number[][] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const groups: number[][] = [];
	for (let i = 0; i < sorted.length; i += 3) {
		const group = sorted.slice(i, i + 3);
		if ((group[2] ?? 0) - (group[0] ?? 0) > k) return [];
		groups.push(group);
	}
	return groups;
};
