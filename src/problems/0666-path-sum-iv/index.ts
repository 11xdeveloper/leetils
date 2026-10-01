/**
 * 666. Path Sum IV
 *
 * A binary tree of depth at most 4 is given as three-digit numbers: depth,
 * position within the level (1 to 8) and value. Returns the sum of all
 * root-to-leaf path sums.
 *
 * Stores each node's value by depth and position. The children of position
 * `p` are `2p - 1` and `2p` on the next level. Every node adds its value
 * once per leaf below it, so it counts leaves from the bottom up and adds
 * `value · leaves` for each node.
 *
 * @see https://leetcode.com/problems/path-sum-iv/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pathSumIV([113, 215, 221]); // 12: (3 + 5) + (3 + 1)
 */
export const pathSumIV = (nums: readonly number[]): number => {
	const values = new Map<number, number>();
	for (const num of nums) values.set(Math.floor(num / 10), num % 10);

	const leaves = new Map<number, number>();
	let total = 0;
	for (const num of nums.toSorted((a, b) => b - a)) {
		const key = Math.floor(num / 10);
		const depth = Math.floor(key / 10);
		const position = key % 10;
		const children = [
			(depth + 1) * 10 + 2 * position - 1,
			(depth + 1) * 10 + 2 * position,
		];
		const below = children.reduce(
			(count, child) => count + (leaves.get(child) ?? 0),
			0,
		);
		const count = below === 0 ? 1 : below;
		leaves.set(key, count);
		total += (values.get(key) ?? 0) * count;
	}

	return total;
};
