/**
 * 3607. Power Grid Maintenance
 *
 * Stations 1 to c, joined by `connections` into grids, start online.
 * Query `[1, x]` returns x if it's online, else the smallest online station
 * in its grid, or -1; query `[2, x]` takes x offline for good.
 *
 * Group each grid's stations in increasing order. Since stations never come
 * back, each grid keeps a pointer that only moves past offline stations.
 *
 * @see https://leetcode.com/problems/power-grid-maintenance/
 * @difficulty Medium
 * @timeComplexity O((c + n) α(c) + q)
 * @spaceComplexity O(c)
 *
 * @example
 * powerGridMaintenance(5, [[1, 2], [2, 3], [3, 4], [4, 5]], [[1, 3], [2, 1], [1, 1], [2, 2], [1, 2]]); // [3, 2, 3]
 */
export const powerGridMaintenance = (
	c: number,
	connections: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const parent = Array.from({ length: c + 1 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x] ?? x] ?? x;
			x = parent[x] ?? x;
		}
		return x;
	};
	for (const [a = 0, b = 0] of connections) parent[find(a)] = find(b);
	const members = new Map<number, number[]>();
	for (let station = 1; station <= c; station++) {
		const root = find(station);
		const list = members.get(root) ?? [];
		list.push(station);
		members.set(root, list);
	}
	const pointer = new Map<number, number>();
	const offline = new Uint8Array(c + 1);
	const answers: number[] = [];
	for (const [kind = 0, x = 0] of queries) {
		if (kind === 2) {
			offline[x] = 1;
			continue;
		}
		if (!offline[x]) {
			answers.push(x);
			continue;
		}
		const root = find(x);
		const list = members.get(root) ?? [];
		let at = pointer.get(root) ?? 0;
		while (at < list.length && offline[list[at] ?? 0]) at++;
		pointer.set(root, at);
		answers.push(list[at] ?? -1);
	}
	return answers;
};
