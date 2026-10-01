/**
 * 1649. Create Sorted Array through Instructions
 *
 * Inserting `instructions` one by one into a sorted container, each insert
 * costs the smaller of how many elements are strictly less and strictly
 * greater. Returns the total cost, modulo 10^9 + 7.
 *
 * A Fenwick tree over the values counts the elements below any value.
 *
 * @see https://leetcode.com/problems/create-sorted-array-through-instructions/
 * @difficulty Hard
 * @timeComplexity O(n log M) for the largest value M
 * @spaceComplexity O(M)
 *
 * @example
 * createSortedArrayThroughInstructions([1, 5, 6, 2]); // 1
 */
export const createSortedArrayThroughInstructions = (
	instructions: readonly number[],
): number => {
	const size = Math.max(...instructions);
	const tree = new Array<number>(size + 1).fill(0);
	const countUpTo = (value: number) => {
		let count = 0;
		for (let i = value; i > 0; i -= i & -i) count += tree[i] ?? 0;
		return count;
	};
	let cost = 0;
	for (const [inserted, value] of instructions.entries()) {
		const less = countUpTo(value - 1);
		const greater = inserted - countUpTo(value);
		cost = (cost + Math.min(less, greater)) % 1_000_000_007;
		for (let i = value; i <= size; i += i & -i) tree[i] = (tree[i] ?? 0) + 1;
	}
	return cost;
};
