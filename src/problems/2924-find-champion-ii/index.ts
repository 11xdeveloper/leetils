/**
 * 2924. Find Champion II
 *
 * In a DAG of teams, an edge `u → v` means `u` is stronger than `v`.
 * Returns the unique team no one is stronger than, or -1 if there isn't
 * exactly one.
 *
 * Find the nodes with no incoming edges.
 *
 * @see https://leetcode.com/problems/find-champion-ii/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n)
 *
 * @example
 * findChampionII(3, [[0, 1], [1, 2]]); // 0
 */
export const findChampionII = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const beaten = new Uint8Array(n);
	for (const [, loser = 0] of edges) beaten[loser] = 1;
	let champion = -1;
	for (let team = 0; team < n; team++) {
		if (beaten[team]) continue;
		if (champion !== -1) return -1;
		champion = team;
	}
	return champion;
};
