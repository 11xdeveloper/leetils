/**
 * 886. Possible Bipartition
 *
 * Returns whether people 1 to `n` can be split into two groups so that no
 * pair in `dislikes` shares a group.
 *
 * The dislikes form a graph that must be two-coloured, checked by
 * breadth-first search from each uncoloured person.
 *
 * @see https://leetcode.com/problems/possible-bipartition/
 * @difficulty Medium
 * @timeComplexity O(n + d)
 * @spaceComplexity O(n + d)
 *
 * @example
 * possibleBipartition(4, [[1, 2], [1, 3], [2, 4]]); // true
 */
export const possibleBipartition = (
	n: number,
	dislikes: readonly (readonly number[])[],
): boolean => {
	const enemies: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [a = 0, b = 0] of dislikes) {
		enemies[a]?.push(b);
		enemies[b]?.push(a);
	}
	const group = new Int8Array(n + 1);
	for (let start = 1; start <= n; start++) {
		if (group[start]) continue;
		group[start] = 1;
		const queue = [start];
		for (const person of queue) {
			for (const enemy of enemies[person] ?? []) {
				if (group[enemy] === group[person]) return false;
				if (!group[enemy]) {
					group[enemy] = -(group[person] ?? 1);
					queue.push(enemy);
				}
			}
		}
	}
	return true;
};
