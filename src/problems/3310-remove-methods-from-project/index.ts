/**
 * 3310. Remove Methods From Project
 *
 * Method `k` is buggy, so it and every method it invokes, directly or not,
 * are suspicious. Remove them all if no other method invokes any of them,
 * and return the methods left (in increasing order); otherwise remove
 * nothing.
 *
 * Mark the suspicious methods with a search from `k`, then check every
 * invocation from outside into them.
 *
 * @see https://leetcode.com/problems/remove-methods-from-project/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * removeMethodsFromProject(4, 1, [[1, 2], [0, 1], [3, 2]]); // [0, 1, 2, 3]
 */
export const removeMethodsFromProject = (
	n: number,
	k: number,
	invocations: readonly (readonly number[])[],
): number[] => {
	const calls: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of invocations) calls[a]?.push(b);
	const suspicious = new Uint8Array(n);
	suspicious[k] = 1;
	const stack = [k];
	for (let method = stack.pop(); method !== undefined; method = stack.pop())
		for (const next of calls[method] ?? [])
			if (!suspicious[next]) {
				suspicious[next] = 1;
				stack.push(next);
			}
	const all = Array.from({ length: n }, (_, i) => i);
	if (invocations.some(([a = 0, b = 0]) => !suspicious[a] && suspicious[b]))
		return all;
	return all.filter((method) => !suspicious[method]);
};
