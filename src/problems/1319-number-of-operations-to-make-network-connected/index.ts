/**
 * 1319. Number of Operations to Make Network Connected
 *
 * `n` computers are joined by `connections`. Moving a cable counts as one
 * operation. Returns the fewest moves to connect every computer, or -1 if
 * there aren't enough cables.
 *
 * Connecting `n` computers takes `n − 1` cables. With enough, each extra
 * group of computers needs one spare cable moved to it, so the answer is
 * the number of groups (found with union–find) minus one.
 *
 * @see https://leetcode.com/problems/number-of-operations-to-make-network-connected/
 * @difficulty Medium
 * @timeComplexity O(n + c · α(n)) for c connections
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfOperationsToMakeNetworkConnected(4, [[0, 1], [0, 2], [1, 2]]); // 1
 */
export const numberOfOperationsToMakeNetworkConnected = (
	n: number,
	connections: readonly (readonly number[])[],
): number => {
	if (connections.length < n - 1) return -1;
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
	for (const [a = 0, b = 0] of connections) {
		const [rootA, rootB] = [find(a), find(b)];
		if (rootA === rootB) continue;
		parent[rootA] = rootB;
		groups--;
	}
	return groups - 1;
};
