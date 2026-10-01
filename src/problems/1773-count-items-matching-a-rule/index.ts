/**
 * 1773. Count Items Matching a Rule
 *
 * Each item is `[type, color, name]`. Counts the items whose field named
 * `ruleKey` equals `ruleValue`.
 *
 * Map the key to a field index and filter.
 *
 * @see https://leetcode.com/problems/count-items-matching-a-rule/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countItemsMatchingARule([["phone", "blue", "pixel"], ["computer", "silver", "lenovo"], ["phone", "gold", "iphone"]], "color", "silver"); // 1
 */
export const countItemsMatchingARule = (
	items: readonly (readonly string[])[],
	ruleKey: string,
	ruleValue: string,
): number => {
	const field = ["type", "color", "name"].indexOf(ruleKey);
	return items.filter((item) => item[field] === ruleValue).length;
};
