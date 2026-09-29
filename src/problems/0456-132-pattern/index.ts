/**
 * 456. 132 Pattern
 *
 * Returns whether `nums` has indices `i < j < k` with
 * `nums[i] < nums[k] < nums[j]`.
 *
 * Scans from the right, keeping a stack of candidates for the "3" in
 * decreasing order. When a larger number arrives, the smaller ones it pops
 * are candidates for the "2", paired with it as the "3"; the largest popped
 * so far is the best "2". A number below that best "2" completes the
 * pattern as the "1".
 *
 * @see https://leetcode.com/problems/132-pattern/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * oneThreeTwoPattern([3, 1, 4, 2]); // true: 1, 4, 2
 */
export const oneThreeTwoPattern = (nums: readonly number[]): boolean => {
	const stack: number[] = [];
	let two = Number.NEGATIVE_INFINITY;

	for (let i = nums.length - 1; i >= 0; i--) {
		const num = nums[i] ?? 0;
		if (num < two) return true;
		while (stack.length > 0 && (stack.at(-1) ?? 0) < num)
			two = stack.pop() ?? two;
		stack.push(num);
	}

	return false;
};
