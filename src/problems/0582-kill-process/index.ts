/**
 * 582. Kill Process
 *
 * Processes form a tree: process `pid[i]` has parent `ppid[i]` (0 for the
 * root). Killing a process kills its whole subtree. Returns the IDs killed
 * by killing `kill`, in the order a breadth-first search finds them.
 *
 * Builds a map from each process to its children, then collects the
 * subtree under `kill` with a queue.
 *
 * @see https://leetcode.com/problems/kill-process/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * killProcess([1, 3, 10, 5], [3, 0, 5, 3], 5); // [5, 10]
 */
export const killProcess = (
	pid: readonly number[],
	ppid: readonly number[],
	kill: number,
): number[] => {
	const children = new Map<number, number[]>();
	for (const [i, id] of pid.entries()) {
		const parent = ppid[i] ?? 0;
		const siblings = children.get(parent);
		if (siblings) siblings.push(id);
		else children.set(parent, [id]);
	}

	const killed = [kill];
	for (let head = 0; head < killed.length; head++)
		killed.push(...(children.get(killed[head] ?? 0) ?? []));
	return killed;
};
