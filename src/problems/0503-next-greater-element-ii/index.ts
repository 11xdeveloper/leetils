/**
 * 503. Next Greater Element II
 *
 * For each element of the circular array `nums`, returns the first larger
 * element found by moving right (wrapping around to the start), or -1 if
 * there isn't one.
 *
 * A monotonic stack of indices still waiting for a larger element. Two
 * passes over the array cover the wrap-around; only the first pushes
 * indices.
 *
 * @see https://leetcode.com/problems/next-greater-element-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nextGreaterElementII([1, 2, 1]); // [2, -1, 2]
 */
export const nextGreaterElementII = (nums: readonly number[]): number[] => {
	const n = nums.length;
	const result = new Array<number>(n).fill(-1);
	const waiting: number[] = [];

	for (let i = 0; i < 2 * n; i++) {
		const num = nums[i % n] ?? 0;
		while (waiting.length > 0 && (nums[waiting.at(-1) ?? 0] ?? 0) < num)
			result[waiting.pop() ?? 0] = num;
		if (i < n) waiting.push(i);
	}

	return result;
};
