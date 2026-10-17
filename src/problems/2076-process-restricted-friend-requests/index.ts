/**
 * 2076. Process Restricted Friend Requests
 *
 * People `restrictions[i]` may never become friends, directly or through
 * others. Processes friend requests in order, accepting each that breaks
 * no restriction, and returns which were accepted.
 *
 * Track friend groups with union-find. A request merges two groups unless
 * some restricted pair has one person in each.
 *
 * @see https://leetcode.com/problems/process-restricted-friend-requests/
 * @difficulty Hard
 * @timeComplexity O(q · r · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * processRestrictedFriendRequests(3, [[0, 1]], [[0, 2], [2, 1]]); // [true, false]
 */
export const processRestrictedFriendRequests = (
	n: number,
	restrictions: readonly (readonly number[])[],
	requests: readonly (readonly number[])[],
): boolean[] => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	return requests.map(([u = 0, v = 0]) => {
		const [a, b] = [find(u), find(v)];
		if (a === b) return true;
		for (const [x = 0, y = 0] of restrictions) {
			const [rx, ry] = [find(x), find(y)];
			if ((rx === a && ry === b) || (rx === b && ry === a)) return false;
		}
		parent[a] = b;
		return true;
	});
};
