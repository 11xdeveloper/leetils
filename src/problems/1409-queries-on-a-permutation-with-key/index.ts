/**
 * 1409. Queries on a Permutation With Key
 *
 * Starting with `P = [1, 2, …, m]`, each query reports its value's position
 * in `P` and moves it to the front. Returns the positions.
 *
 * Places the permutation in a Fenwick tree with room in front for every
 * query: moving a value to the front marks a fresh slot before all the
 * others, and a value's position is the count of marked slots before it.
 *
 * @see https://leetcode.com/problems/queries-on-a-permutation-with-key/
 * @difficulty Medium
 * @timeComplexity O((q + m) log(q + m))
 * @spaceComplexity O(q + m)
 *
 * @example
 * queriesOnAPermutationWithKey([3, 1, 2, 1], 5); // [2, 1, 2, 1]
 */
export const queriesOnAPermutationWithKey = (
	queries: readonly number[],
	m: number,
): number[] => {
	const size = queries.length + m;
	const tree = new Array<number>(size + 1).fill(0);
	const add = (slot: number, delta: number) => {
		for (let i = slot; i <= size; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const countUpTo = (slot: number) => {
		let count = 0;
		for (let i = slot; i > 0; i -= i & -i) count += tree[i] ?? 0;
		return count;
	};
	// Slots 1 … q are left free for moves to the front; value v starts at q + v.
	const slotOf = new Array<number>(m + 1).fill(0);
	for (let value = 1; value <= m; value++) {
		slotOf[value] = queries.length + value;
		add(queries.length + value, 1);
	}
	return queries.map((value, i) => {
		const slot = slotOf[value] ?? 0;
		const position = countUpTo(slot - 1);
		add(slot, -1);
		const front = queries.length - i;
		slotOf[value] = front;
		add(front, 1);
		return position;
	});
};
