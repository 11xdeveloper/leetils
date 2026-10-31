/**
 * 2121. Intervals Between Identical Elements
 *
 * Returns, for each index, the sum of its distances to every other index
 * holding the same value.
 *
 * Group indices by value. Within a group, a running sum of the indices
 * before each one gives its distance to them, and likewise after.
 *
 * @see https://leetcode.com/problems/intervals-between-identical-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * intervalsBetweenIdenticalElements([2, 1, 3, 1, 2, 3, 3]); // [4, 2, 7, 2, 4, 4, 5]
 */
export const intervalsBetweenIdenticalElements = (
	arr: readonly number[],
): number[] => {
	const groups = new Map<number, number[]>();
	for (const [i, value] of arr.entries()) {
		const group = groups.get(value);
		if (group) group.push(i);
		else groups.set(value, [i]);
	}
	const intervals = new Array<number>(arr.length).fill(0);
	for (const indices of groups.values()) {
		const total = indices.reduce((sum, i) => sum + i, 0);
		let before = 0;
		for (const [k, i] of indices.entries()) {
			const after = total - before - i;
			intervals[i] = i * k - before + after - i * (indices.length - k - 1);
			before += i;
		}
	}
	return intervals;
};
