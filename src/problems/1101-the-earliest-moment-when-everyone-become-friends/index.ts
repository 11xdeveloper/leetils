/**
 * 1101. The Earliest Moment When Everyone Become Friends
 *
 * `logs[i] = [timestamp, x, y]` means people `x` and `y` become friends at
 * that time. Returns the earliest time at which all `n` people are
 * acquainted (connected through friends), or -1 if that never happens.
 *
 * Union–find over the logs in time order, counting groups until only one is
 * left.
 *
 * @see https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends/
 * @difficulty Medium
 * @timeComplexity O(m log m + m · α(n)) for m logs
 * @spaceComplexity O(n + m)
 *
 * @example
 * theEarliestMomentWhenEveryoneBecomeFriends([[0, 2, 0], [1, 0, 1], [3, 0, 3], [4, 1, 2], [7, 3, 1]], 4); // 3
 */
export const theEarliestMomentWhenEveryoneBecomeFriends = (
	logs: readonly (readonly number[])[],
	n: number,
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	let groups = n;
	for (const [time = 0, x = 0, y = 0] of logs.toSorted(
		(a, b) => (a[0] ?? 0) - (b[0] ?? 0),
	)) {
		const [rootX, rootY] = [find(x), find(y)];
		if (rootX === rootY) continue;
		parent[rootX] = rootY;
		groups--;
		if (groups === 1) return time;
	}
	return -1;
};
