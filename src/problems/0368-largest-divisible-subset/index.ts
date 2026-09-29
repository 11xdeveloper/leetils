/**
 * 368. Largest Divisible Subset
 *
 * Returns a largest subset of the distinct positive integers `nums` in which
 * every pair divides one way or the other. Any largest subset is accepted.
 *
 * Sorted, a divisible subset is a chain where each value divides the next,
 * like 1, 2, 4, 8. Dynamic programming finds the longest chain ending at
 * each value, remembering the value before it, and the longest chain
 * overall is rebuilt from those links.
 *
 * @see https://leetcode.com/problems/largest-divisible-subset/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * largestDivisibleSubset([1, 2, 4, 8]); // [1, 2, 4, 8]
 */
export const largestDivisibleSubset = (nums: readonly number[]): number[] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const length = sorted.map(() => 1);
	const previous = sorted.map(() => -1);
	let end = 0;

	for (let i = 0; i < sorted.length; i++) {
		for (let j = 0; j < i; j++) {
			if (
				(sorted[i] ?? 0) % (sorted[j] ?? 1) === 0 &&
				(length[j] ?? 0) + 1 > (length[i] ?? 0)
			) {
				length[i] = (length[j] ?? 0) + 1;
				previous[i] = j;
			}
		}
		if ((length[i] ?? 0) > (length[end] ?? 0)) end = i;
	}

	const subset: number[] = [];
	for (let i = sorted.length > 0 ? end : -1; i !== -1; i = previous[i] ?? -1)
		subset.push(sorted[i] ?? 0);
	return subset.reverse();
};
