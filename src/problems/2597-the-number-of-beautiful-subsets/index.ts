/**
 * 2597. The Number of Beautiful Subsets
 *
 * A subset is beautiful if no two of its elements differ by exactly `k`.
 * Returns the number of non-empty beautiful subsets.
 *
 * Only values in the same residue class modulo `k` can clash, and only
 * neighbours in sorted order. Within each class, a house-robber DP counts
 * choices where each distinct value is skipped or contributes any
 * non-empty set of its copies; multiply across classes.
 *
 * @see https://leetcode.com/problems/the-number-of-beautiful-subsets/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * theNumberOfBeautifulSubsets([2, 4, 6], 2); // 4
 */
export const theNumberOfBeautifulSubsets = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const classes = new Map<number, number[]>();
	for (const value of counts.keys()) {
		const values = classes.get(value % k) ?? [];
		values.push(value);
		classes.set(value % k, values);
	}

	let total = 1;
	for (const values of classes.values()) {
		values.sort((a, b) => a - b);
		let skip = 1;
		let take = 0;
		let previous = Number.NEGATIVE_INFINITY;
		for (const value of values) {
			const ways = 2 ** (counts.get(value) ?? 0) - 1;
			const free = skip + take;
			const nextTake = (value - previous === k ? skip : free) * ways;
			skip = free;
			take = nextTake;
			previous = value;
		}
		total *= skip + take;
	}
	return total - 1;
};
