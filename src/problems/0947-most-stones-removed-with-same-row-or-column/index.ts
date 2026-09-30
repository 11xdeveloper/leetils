/**
 * 947. Most Stones Removed with Same Row or Column
 *
 * A stone can be removed if another stone shares its row or column.
 * Returns the most stones that can be removed.
 *
 * Stones linked by shared rows or columns form groups, and each group can
 * be removed down to one stone. Union–find joins each stone's row with its
 * column; the answer is stones minus groups.
 *
 * @see https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
 * @difficulty Medium
 * @timeComplexity O(n · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * mostStonesRemovedWithSameRowOrColumn([[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]]); // 5
 */
export const mostStonesRemovedWithSameRowOrColumn = (
	stones: readonly (readonly number[])[],
): number => {
	const parent = new Map<string, string>();
	const find = (key: string): string => {
		if (!parent.has(key)) parent.set(key, key);
		let root = key;
		while (parent.get(root) !== root) root = parent.get(root) ?? root;
		for (let node = key; node !== root; ) {
			const next = parent.get(node) ?? root;
			parent.set(node, root);
			node = next;
		}
		return root;
	};
	for (const [row = 0, col = 0] of stones)
		parent.set(find(`r${row}`), find(`c${col}`));

	const groups = new Set(stones.map(([row = 0]) => find(`r${row}`)));
	return stones.length - groups.size;
};
