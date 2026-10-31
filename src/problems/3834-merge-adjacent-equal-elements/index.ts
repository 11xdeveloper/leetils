/**
 * 3834. Merge Adjacent Equal Elements
 *
 * Repeatedly replace the leftmost pair of equal neighbours with their
 * sum. Returns the final array.
 *
 * A stack holds the merged prefix, which never has equal neighbours, so
 * the leftmost pair is always its top and the next element: merge while
 * they match.
 *
 * @see https://leetcode.com/problems/merge-adjacent-equal-elements/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mergeAdjacentEqualElements([2, 2, 4]); // [8]
 */
export const mergeAdjacentEqualElements = (
	nums: readonly number[],
): number[] => {
	const stack: number[] = [];
	for (let value of nums) {
		while (stack.at(-1) === value) value += stack.pop() ?? 0;
		stack.push(value);
	}
	return stack;
};
