/**
 * 496. Next Greater Element I
 *
 * `nums1` is a subset of `nums2`, which has distinct values. For each value
 * in `nums1`, returns the first larger value to its right in `nums2`, or -1
 * if there isn't one.
 *
 * One pass over `nums2` with a stack of values still waiting for a larger
 * one, which is decreasing. Each new value answers every smaller value on
 * top of the stack. The answers are stored in a map for `nums1` to look up.
 *
 * @see https://leetcode.com/problems/next-greater-element-i/
 * @difficulty Easy
 * @timeComplexity O(m + n)
 * @spaceComplexity O(n)
 *
 * @example
 * nextGreaterElementI([4, 1, 2], [1, 3, 4, 2]); // [-1, 3, -1]
 */
export const nextGreaterElementI = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const nextGreater = new Map<number, number>();
	const waiting: number[] = [];

	for (const num of nums2) {
		while (waiting.length > 0 && (waiting.at(-1) ?? 0) < num)
			nextGreater.set(waiting.pop() ?? 0, num);
		waiting.push(num);
	}

	return nums1.map((num) => nextGreater.get(num) ?? -1);
};
