/**
 * 599. Minimum Index Sum of Two Lists
 *
 * Returns the strings common to `list1` and `list2` (each without
 * duplicates) with the smallest sum of their indices in the two lists. Ties
 * are all returned, in the order they appear in `list2`.
 *
 * Maps each string in `list1` to its index, then scans `list2`, keeping the
 * common strings with the smallest sum so far.
 *
 * @see https://leetcode.com/problems/minimum-index-sum-of-two-lists/
 * @difficulty Easy
 * @timeComplexity O(m + n) string lookups
 * @spaceComplexity O(m)
 *
 * @example
 * minimumIndexSumOfTwoLists(["happy", "sad", "good"], ["sad", "happy", "good"]); // ["sad", "happy"]
 */
export const minimumIndexSumOfTwoLists = (
	list1: readonly string[],
	list2: readonly string[],
): string[] => {
	const indexIn1 = new Map(list1.map((str, i) => [str, i]));
	let best = Number.POSITIVE_INFINITY;
	let common: string[] = [];

	for (const [j, str] of list2.entries()) {
		const i = indexIn1.get(str);
		if (i === undefined || i + j > best) continue;
		if (i + j < best) {
			best = i + j;
			common = [];
		}
		common.push(str);
	}

	return common;
};
