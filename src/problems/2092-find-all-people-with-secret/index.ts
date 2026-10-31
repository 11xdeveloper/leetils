/**
 * 2092. Find All People With Secret
 *
 * Person 0 shares a secret with `firstPerson` at time 0; at each meeting
 * `[x, y, time]` anyone who knows it shares it, instantly passing it on
 * through other meetings at the same time. Returns everyone who knows the
 * secret in the end, in ascending order.
 *
 * Process meetings grouped by time with union-find, joining those who
 * know to person 0. After each time, reset the people in it who didn't
 * end up connected to 0.
 *
 * @see https://leetcode.com/problems/find-all-people-with-secret/
 * @difficulty Hard
 * @timeComplexity O(m log m + n)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findAllPeopleWithSecret(6, [[1, 2, 5], [2, 3, 8], [1, 5, 10]], 1); // [0, 1, 2, 3, 5]
 */
export const findAllPeopleWithSecret = (
	n: number,
	meetings: readonly (readonly number[])[],
	firstPerson: number,
): number[] => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	/** Joins two groups, keeping 0 as the root of its group. */
	const union = (a: number, b: number): void => {
		const [ra, rb] = [find(a), find(b)];
		if (ra === rb) return;
		if (ra === 0) parent[rb] = 0;
		else parent[ra] = rb;
	};
	union(0, firstPerson);

	const sorted = meetings.toSorted((a, b) => (a[2] ?? 0) - (b[2] ?? 0));
	for (let start = 0; start < sorted.length; ) {
		const time = sorted[start]?.[2];
		let end = start;
		while (end < sorted.length && sorted[end]?.[2] === time) end++;
		const group = sorted.slice(start, end);
		for (const [x = 0, y = 0] of group) union(x, y);
		for (const [x = 0, y = 0] of group) {
			if (find(x) !== 0) parent[x] = x;
			if (find(y) !== 0) parent[y] = y;
		}
		start = end;
	}
	return parent.flatMap((_, person) => (find(person) === 0 ? [person] : []));
};
