/**
 * 2638. Count the Number of K-Free Subsets
 *
 * A subset of the distinct numbers in `nums` is k-free if no two of its
 * elements differ by exactly `k`. Returns the number of k-free subsets,
 * including the empty one.
 *
 * Only numbers in the same residue class modulo `k` can clash, and only
 * neighbours in sorted order, so each class is a house-robber chain:
 * count its independent sets and multiply across classes.
 *
 * @see https://leetcode.com/problems/count-the-number-of-k-free-subsets/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfKFreeSubsets([2, 3, 5, 8], 5); // 12
 */
export const countTheNumberOfKFreeSubsets = (
	nums: readonly number[],
	k: number,
): number => {
	const classes = new Map<number, number[]>();
	for (const num of nums) {
		const values = classes.get(num % k) ?? [];
		values.push(num);
		classes.set(num % k, values);
	}
	let total = 1;
	for (const values of classes.values()) {
		values.sort((a, b) => a - b);
		let skip = 1;
		let take = 0;
		let previous = Number.NEGATIVE_INFINITY;
		for (const value of values) {
			const nextTake = value - previous === k ? skip : skip + take;
			skip += take;
			take = nextTake;
			previous = value;
		}
		total *= skip + take;
	}
	return total;
};
