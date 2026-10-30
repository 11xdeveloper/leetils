/**
 * 2115. Find All Possible Recipes from Given Supplies
 *
 * Each recipe needs ingredients, which may be supplies (unlimited) or
 * other recipes. Returns the recipes that can be made, in input order.
 *
 * Topological sort: count each recipe's missing ingredients, and as each
 * supply or recipe becomes available, release the recipes waiting on it.
 *
 * @see https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/
 * @difficulty Medium
 * @timeComplexity O(total ingredients)
 * @spaceComplexity O(total ingredients)
 *
 * @example
 * findAllPossibleRecipesFromGivenSupplies(["bread"], [["yeast", "flour"]], ["yeast", "flour", "corn"]); // ["bread"]
 */
export const findAllPossibleRecipesFromGivenSupplies = (
	recipes: readonly string[],
	ingredients: readonly (readonly string[])[],
	supplies: readonly string[],
): string[] => {
	const waiting = new Map<string, number[]>();
	const missing = ingredients.map((needed, recipe) => {
		for (const item of needed) {
			const list = waiting.get(item);
			if (list) list.push(recipe);
			else waiting.set(item, [recipe]);
		}
		return needed.length;
	});
	const made = new Set<number>();
	const available = [...supplies];
	for (let item = available.pop(); item !== undefined; item = available.pop()) {
		for (const recipe of waiting.get(item) ?? []) {
			missing[recipe] = (missing[recipe] ?? 0) - 1;
			if (missing[recipe] !== 0) continue;
			made.add(recipe);
			available.push(recipes[recipe] ?? "");
		}
	}
	return recipes.filter((_, recipe) => made.has(recipe));
};
