/**
 * 904. Fruit Into Baskets
 *
 * Walking right from any tree, you pick one fruit from each tree into two
 * baskets that each hold one type, stopping at a third type. Returns the
 * most fruit you can pick: the longest subarray of `fruits` with at most
 * two types.
 *
 * Sliding window with a count per type, shrinking from the left whenever a
 * third type enters.
 *
 * @see https://leetcode.com/problems/fruit-into-baskets/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * fruitIntoBaskets([1, 2, 3, 2, 2]); // 4
 */
export const fruitIntoBaskets = (fruits: readonly number[]): number => {
	const counts = new Map<number, number>();
	let longest = 0;
	for (let left = 0, right = 0; right < fruits.length; right++) {
		const fruit = fruits[right] ?? 0;
		counts.set(fruit, (counts.get(fruit) ?? 0) + 1);
		while (counts.size > 2) {
			const leaving = fruits[left++] ?? 0;
			const remaining = (counts.get(leaving) ?? 1) - 1;
			if (remaining === 0) counts.delete(leaving);
			else counts.set(leaving, remaining);
		}
		longest = Math.max(longest, right - left + 1);
	}
	return longest;
};
