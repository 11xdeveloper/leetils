/**
 * 2077. Paths in Maze That Lead to Same Room
 *
 * Rooms `1..n` are joined by two-way corridors. Returns the confusion
 * score: the number of distinct cycles of length 3.
 *
 * For each corridor `u < v`, count the rooms `w > v` joined to both, so
 * each triangle is counted once from its two smallest rooms.
 *
 * @see https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room/
 * @difficulty Medium
 * @timeComplexity O(e · d) for maximum degree d
 * @spaceComplexity O(n + e)
 *
 * @example
 * pathsInMazeThatLeadToSameRoom(5, [[1, 2], [5, 2], [4, 1], [2, 4], [3, 1], [3, 4]]); // 2
 */
export const pathsInMazeThatLeadToSameRoom = (
	n: number,
	corridors: readonly (readonly number[])[],
): number => {
	const neighbours = Array.from({ length: n + 1 }, () => new Set<number>());
	for (const [a = 0, b = 0] of corridors) {
		neighbours[a]?.add(b);
		neighbours[b]?.add(a);
	}
	let cycles = 0;
	for (const [a = 0, b = 0] of corridors) {
		const [u, v] = a < b ? [a, b] : [b, a];
		for (const w of neighbours[u] ?? []) {
			if (w > v && neighbours[v]?.has(w)) cycles++;
		}
	}
	return cycles;
};
