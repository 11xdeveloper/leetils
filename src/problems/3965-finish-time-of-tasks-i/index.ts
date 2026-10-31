/**
 * 3965. Finish Time of Tasks I
 *
 * In a tree of tasks rooted at 0, a leaf finishes at its `baseTime`; any
 * other task finishes at latest + (latest - earliest) + `baseTime`, over
 * its children's finish times. Returns the root's finish time.
 *
 * @see https://leetcode.com/problems/finish-time-of-tasks-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * finishTimeOfTasksI(3, [[0, 1], [1, 2]], [9, 5, 3]); // 17
 */
export const finishTimeOfTasksI = (
	n: number,
	edges: readonly (readonly number[])[],
	baseTime: readonly number[],
): number => {
	const children: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) children[u]?.push(v);
	const order = [0];
	for (let i = 0; i < order.length; i++)
		order.push(...(children[order[i] ?? 0] ?? []));
	const finish = new Float64Array(n);
	for (let i = n - 1; i >= 0; i--) {
		const v = order[i] ?? 0;
		const kids = children[v] ?? [];
		if (kids.length === 0) {
			finish[v] = baseTime[v] ?? 0;
			continue;
		}
		let [earliest, latest] = [Number.POSITIVE_INFINITY, 0];
		for (const child of kids) {
			earliest = Math.min(earliest, finish[child] ?? 0);
			latest = Math.max(latest, finish[child] ?? 0);
		}
		finish[v] = 2 * latest - earliest + (baseTime[v] ?? 0);
	}
	return finish[0] ?? 0;
};
