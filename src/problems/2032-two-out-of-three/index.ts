/**
 * 2032. Two Out of Three
 *
 * Returns the distinct values present in at least two of the three
 * arrays, in ascending order.
 *
 * Mark each value with a bit per array it appears in.
 *
 * @see https://leetcode.com/problems/two-out-of-three/
 * @difficulty Easy
 * @timeComplexity O(n + m log m) for m distinct values
 * @spaceComplexity O(m)
 *
 * @example
 * twoOutOfThree([1, 1, 3, 2], [2, 3], [3]); // [2, 3]
 */
export const twoOutOfThree = (
	nums1: readonly number[],
	nums2: readonly number[],
	nums3: readonly number[],
): number[] => {
	const arrays = new Map<number, number>();
	for (const [bit, nums] of [nums1, nums2, nums3].entries()) {
		for (const num of nums)
			arrays.set(num, (arrays.get(num) ?? 0) | (1 << bit));
	}
	return [...arrays]
		.filter(([, bits]) => bits !== 1 && bits !== 2 && bits !== 4)
		.map(([num]) => num)
		.sort((a, b) => a - b);
};
