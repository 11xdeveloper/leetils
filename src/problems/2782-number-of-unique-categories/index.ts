/** The interface LeetCode provides to compare elements' hidden categories. */
interface CategoryHandler {
	haveSameCategory(a: number, b: number): boolean;
}

/**
 * 2782. Number of Unique Categories
 *
 * Elements 0 to `n - 1` each belong to a hidden category, which can only
 * be compared through `categoryHandler`. Returns the number of
 * categories.
 *
 * Keep one representative per category found, and compare each element
 * against them.
 *
 * @see https://leetcode.com/problems/number-of-unique-categories/
 * @difficulty Medium
 * @timeComplexity O(n · c), where `c` is the number of categories
 * @spaceComplexity O(c)
 *
 * @example
 * numberOfUniqueCategories(3, { haveSameCategory: () => true }); // 1
 */
export const numberOfUniqueCategories = (
	n: number,
	categoryHandler: CategoryHandler,
): number => {
	const representatives: number[] = [];
	for (let element = 0; element < n; element++)
		if (
			!representatives.some((r) => categoryHandler.haveSameCategory(r, element))
		)
			representatives.push(element);
	return representatives.length;
};
