/**
 * 4038. Count Integers Appearing in a Single Block
 *
 * Counts the distinct values whose occurrences in `nums` form one
 * contiguous block.
 *
 * @see https://leetcode.com/problems/count-integers-appearing-in-a-single-block/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countIntegersAppearingInASingleBlock([3, 3, 1, 2, 2, 1]); // 2
 */
export const countIntegersAppearingInASingleBlock = (
	nums: readonly number[],
): number => {
	const spans = new Map<number, [first: number, last: number, count: number]>();
	nums.forEach((x, i) => {
		const span = spans.get(x);
		if (span) {
			span[1] = i;
			span[2]++;
		} else spans.set(x, [i, i, 1]);
	});
	return [...spans.values()].filter(
		([first, last, count]) => last - first + 1 === count,
	).length;
};
