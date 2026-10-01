import type { NestedInteger } from "../../structures/nested-integer";

/**
 * 339. Nested List Weight Sum
 *
 * Returns the sum of every integer in a nested list, each multiplied by its
 * depth: how many lists it's inside.
 *
 * Breadth-first search, one depth at a time: integers at the current depth
 * are added with that weight, and lists are opened into the next depth.
 *
 * @see https://leetcode.com/problems/nested-list-weight-sum/
 * @difficulty Medium
 * @timeComplexity O(n) where n is the total number of integers and lists
 * @spaceComplexity O(n)
 *
 * @example
 * nestedListWeightSum(nestedListFromArray([[1, 1], 2, [1, 1]])); // 10
 */
export const nestedListWeightSum = (
	nestedList: readonly NestedInteger[],
): number => {
	let sum = 0;
	let level = nestedList;

	for (let depth = 1; level.length > 0; depth++) {
		const next: NestedInteger[] = [];
		for (const item of level) {
			if (item.isInteger()) sum += (item.getInteger() ?? 0) * depth;
			else next.push(...item.getList());
		}
		level = next;
	}

	return sum;
};
