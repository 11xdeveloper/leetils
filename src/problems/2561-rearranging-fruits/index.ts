/**
 * 2561. Rearranging Fruits
 *
 * Swapping fruit `i` of one basket with fruit `j` of the other costs the
 * smaller of their two costs. Returns the cheapest way to make the
 * baskets equal once sorted, or -1 if that's impossible.
 *
 * Each cost must appear an even number of times overall, and each basket
 * must give away its surplus. Pair the cheapest half of the fruits to
 * move with the rest; each swap costs either the cheaper fruit directly
 * or two swaps through the cheapest fruit anywhere.
 *
 * @see https://leetcode.com/problems/rearranging-fruits/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * rearrangingFruits([4, 2, 2, 2], [1, 4, 1, 2]); // 1
 */
export const rearrangingFruits = (
	basket1: readonly number[],
	basket2: readonly number[],
): number => {
	const balance = new Map<number, number>();
	for (const fruit of basket1)
		balance.set(fruit, (balance.get(fruit) ?? 0) + 1);
	for (const fruit of basket2)
		balance.set(fruit, (balance.get(fruit) ?? 0) - 1);

	const toMove: number[] = [];
	for (const [fruit, surplus] of balance) {
		if (surplus % 2 !== 0) return -1;
		for (let i = 0; i < Math.abs(surplus) / 2; i++) toMove.push(fruit);
	}
	toMove.sort((a, b) => a - b);

	const cheapest = Math.min(...basket1, ...basket2);
	let cost = 0;
	for (let i = 0; i < toMove.length / 2; i++)
		cost += Math.min(toMove[i] ?? 0, 2 * cheapest);
	return cost;
};
