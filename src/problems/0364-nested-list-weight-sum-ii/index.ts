import type { NestedInteger } from "../../structures/nested-integer";

/**
 * 364. Nested List Weight Sum II
 *
 * Returns the sum of every integer in a nested list, each weighted by
 * `maxDepth - depth + 1`, so the deepest integers count once and the
 * shallowest count most.
 *
 * Walks the list level by level without knowing the maximum depth in
 * advance. After each level, the running sum of all integers seen so far is
 * added to the total, so an integer at depth `d` is added once for each of
 * the `maxDepth - d + 1` levels from its own down to the deepest.
 *
 * @see https://leetcode.com/problems/nested-list-weight-sum-ii/
 * @difficulty Medium
 * @timeComplexity O(n) where n is the total number of integers and lists
 * @spaceComplexity O(n)
 *
 * @example
 * nestedListWeightSumII(nestedListFromArray([1, [4, [6]]])); // 17: 1 × 3 + 4 × 2 + 6 × 1
 */
export const nestedListWeightSumII = (
	nestedList: readonly NestedInteger[],
): number => {
	let total = 0;
	let running = 0;
	let level = nestedList;

	while (level.length > 0) {
		const next: NestedInteger[] = [];
		for (const item of level) {
			if (item.isInteger()) running += item.getInteger() ?? 0;
			else next.push(...item.getList());
		}
		total += running;
		level = next;
	}

	return total;
};
