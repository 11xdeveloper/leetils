/**
 * 1418. Display Table of Food Orders in a Restaurant
 *
 * Each order is `[customer, table, food]`. Returns a table with a header
 * row `["Table", …foods alphabetically]`, then one row per table (in
 * numeric order) counting its orders of each food.
 *
 * Counts orders per table and food, then lays them out.
 *
 * @see https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant/
 * @difficulty Medium
 * @timeComplexity O(n + t · f + f log f + t log t) for t tables and f foods
 * @spaceComplexity O(t · f)
 *
 * @example
 * displayTableOfFoodOrdersInARestaurant([["Laura", "2", "Bean Burrito"], ["Jhon", "2", "Beef Burrito"], ["Melissa", "2", "Soda"]]);
 * // [["Table", "Bean Burrito", "Beef Burrito", "Soda"], ["2", "1", "1", "1"]]
 */
export const displayTableOfFoodOrdersInARestaurant = (
	orders: readonly (readonly string[])[],
): string[][] => {
	const counts = new Map<number, Map<string, number>>();
	const foods = new Set<string>();
	for (const [, table = "", food = ""] of orders) {
		foods.add(food);
		const row = counts.get(Number(table)) ?? new Map<string, number>();
		counts.set(Number(table), row);
		row.set(food, (row.get(food) ?? 0) + 1);
	}
	const columns = [...foods].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
	const tables = [...counts.keys()].sort((a, b) => a - b);
	return [
		["Table", ...columns],
		...tables.map((table) => [
			String(table),
			...columns.map((food) => String(counts.get(table)?.get(food) ?? 0)),
		]),
	];
};
