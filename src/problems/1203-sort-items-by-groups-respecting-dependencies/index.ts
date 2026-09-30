/**
 * 1203. Sort Items by Groups Respecting Dependencies
 *
 * Orders items `0 … n − 1` so that items in the same group (`group[i]`, or
 * -1 for none) are next to each other and every item comes after those in
 * `beforeItems[i]`. Returns any such order, or `[]` if there's none.
 *
 * Gives each ungrouped item a group of its own, then sorts topologically
 * twice: the groups by the dependencies that cross between groups, and the
 * items within each group by the rest. Listing the groups in order, each
 * with its items in order, satisfies everything.
 *
 * @see https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/
 * @difficulty Hard
 * @timeComplexity O(n + m + d) for d dependencies
 * @spaceComplexity O(n + m + d)
 *
 * @example
 * sortItemsByGroupsRespectingDependencies(8, 2, [-1, -1, 1, 0, 0, 1, 0, -1], [[], [6], [5], [6], [3, 6], [], [], []]);
 * // [6, 3, 4, 5, 2, 0, 7, 1]
 */
export const sortItemsByGroupsRespectingDependencies = (
	n: number,
	m: number,
	group: readonly number[],
	beforeItems: readonly (readonly number[])[],
): number[] => {
	let groups = m;
	const groupOf = group.map((g) => (g === -1 ? groups++ : g));

	const itemEdges = Array.from({ length: n }, (): number[] => []);
	const groupEdges = Array.from({ length: groups }, (): number[] => []);
	beforeItems.forEach((before, item) => {
		for (const first of before) {
			const [from, to] = [groupOf[first] ?? 0, groupOf[item] ?? 0];
			if (from === to) itemEdges[first]?.push(item);
			else groupEdges[from]?.push(to);
		}
	});

	const groupOrder = topologicalSort(groups, groupEdges);
	const itemOrder = topologicalSort(n, itemEdges);
	if (!groupOrder || !itemOrder) return [];

	const members = Array.from({ length: groups }, (): number[] => []);
	for (const item of itemOrder) members[groupOf[item] ?? 0]?.push(item);
	return groupOrder.flatMap((g) => members[g] ?? []);
};

/** Kahn's algorithm; returns undefined if the graph has a cycle. */
const topologicalSort = (
	count: number,
	edges: readonly (readonly number[])[],
): number[] | undefined => {
	const waiting = new Array<number>(count).fill(0);
	for (const targets of edges) {
		for (const to of targets) waiting[to] = (waiting[to] ?? 0) + 1;
	}
	const order: number[] = [];
	for (let node = 0; node < count; node++)
		if (waiting[node] === 0) order.push(node);
	for (let i = 0; i < order.length; i++) {
		for (const to of edges[order[i] ?? 0] ?? []) {
			waiting[to] = (waiting[to] ?? 0) - 1;
			if (waiting[to] === 0) order.push(to);
		}
	}
	return order.length === count ? order : undefined;
};
