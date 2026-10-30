/**
 * 2892. Minimizing Array After Replacing Pairs With Their Product
 *
 * An operation replaces two adjacent elements with their product, if it's
 * at most `k`. Returns the shortest length reachable.
 *
 * A 0 can absorb everything, leaving one element. Otherwise merge
 * greedily from the left while the running product stays within `k`.
 *
 * @see https://leetcode.com/problems/minimizing-array-after-replacing-pairs-with-their-product/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimizingArrayAfterReplacingPairsWithTheirProduct([2, 3, 3, 7, 3, 5], 20); // 3
 */
export const minimizingArrayAfterReplacingPairsWithTheirProduct = (
	nums: readonly number[],
	k: number,
): number => {
	if (nums.includes(0)) return 1;
	let length = 1;
	let product = nums[0] ?? 1;
	for (const num of nums.slice(1)) {
		if (product * num <= k) product *= num;
		else {
			length++;
			product = num;
		}
	}
	return length;
};
